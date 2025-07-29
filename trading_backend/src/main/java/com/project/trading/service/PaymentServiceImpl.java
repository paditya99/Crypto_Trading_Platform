package com.project.trading.service;

import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.project.trading.domain.PaymentMethod;
import com.project.trading.domain.PaymentStatus;
import com.project.trading.model.PaymentOrder;
import com.project.trading.model.User;
import com.project.trading.repository.PaymentOrderRepository;
import com.project.trading.response.PaymentResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepo;

    @Value("${razorpay.api.key}")
    private String razorpayAPIKey;
    @Value("${razorpay.key.secret}")
    private String razorpayAPISecret;
    @Value("${stripe.api.key}")
    private String stripeAPIKey;
    @Value("${stripe.key.secret}")
    private String stripeAPISecret;
    

    @Override
    public PaymentOrder createPaymentOrder(Long amount, PaymentMethod paymentMethod, User user) {
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setUser(user);
        paymentOrder.setPaymentStatus(PaymentStatus.PENDING);
        return paymentOrderRepo.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) {
        Optional<PaymentOrder> paymentOrder = paymentOrderRepo.findById(id);
        if(paymentOrder.isPresent()){
            return paymentOrder.get();
        }
        return null;
    }

    @Override
    public boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) {
        String status="";
        Integer amount=0;

        if(paymentOrder.getPaymentStatus()==null){
            paymentOrder.setPaymentStatus(PaymentStatus.PENDING);
        }

         if(paymentOrder.getPaymentStatus().equals(PaymentStatus.PENDING)){
            if(paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)){
                try {
                    RazorpayClient razorpayClient = new RazorpayClient(razorpayAPIKey, razorpayAPISecret);
                    Payment payment = razorpayClient.payments.fetch(paymentId);

                    amount = payment.get("amount");
                    status=payment.get("status");
                } catch (RazorpayException e) {
                    // Handle Razorpay exception
                    paymentOrder.setPaymentStatus(PaymentStatus.FAILED);
                    paymentOrderRepo.save(paymentOrder);
                    return false;
                }
                if(status.equals("captured")){
                    paymentOrder.setPaymentStatus(PaymentStatus.SUCCESS);
                    return true;
                }
                paymentOrder.setPaymentStatus(PaymentStatus.FAILED);
                paymentOrderRepo.save(paymentOrder);
                return false;  
            }
            paymentOrder.setPaymentStatus(PaymentStatus.SUCCESS);
            paymentOrderRepo.save(paymentOrder);
            return true; 
        }
        return false;

    }
    

    @Override
    public PaymentResponse createRazorpayPaymentLink(Long amount, User user, Long orderId) {
        Long Amount=amount*100;
        try{
            RazorpayClient razorpayClient = new RazorpayClient(razorpayAPIKey, razorpayAPISecret);
            
            JSONObject paymentLinkRequest=new JSONObject();
            paymentLinkRequest.put("amount", Amount);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer=new JSONObject();
            customer.put("name", user.getFullname());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify=new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("reminder_enable", true);

            //set the callback url and method
            paymentLinkRequest.put("callback_url", "http://localhost:5173/wallet?order_id=" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            //create the payment link using paymentLink.create() method
            PaymentLink paymentLink=razorpayClient.paymentLink.create(paymentLinkRequest);
            String paymentLinkId=paymentLink.get("id");
            String paymentLinkUrl=paymentLink.get("short_url");

            //create the payment response
            PaymentResponse paymentResponse=new PaymentResponse();
            paymentResponse.setPayment_url(paymentLinkUrl);
            return paymentResponse;

        }
        catch(Exception e){
            throw new RuntimeException("Failed to create Razorpay payment link", e);
        }
    }

// RAZORPAY WORKFLOW
//JSON Request → PaymentLink.create() → Extract URL

// STRIPE WORKFLOW  
//Builder Pattern → Session.create() → Extract URL

    @Override
    public PaymentResponse createStripePaymentLink(Long amount, User user, Long orderId) {
        try {
            Stripe.apiKey = stripeAPISecret;
            SessionCreateParams sessionCreateParams = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id=" + orderId)
                .setCancelUrl("http://localhost:5173/wallet")
                .addLineItem(SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("usd")
                        .setUnitAmount(amount*100)
                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName("Top up wallet " + orderId)
                            .build())
                    .build())
                .build())
            .build();

        Session session=Session.create(sessionCreateParams);
        System.out.println("Session created: " + session.getId());
        String paymentUrl=session.getUrl();
        PaymentResponse paymentResponse=new PaymentResponse();
        paymentResponse.setPayment_url(paymentUrl);

        return paymentResponse;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Stripe payment link", e);
        }
    }
}
