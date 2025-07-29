export const existInWatchList = (items, coin) => {
    console.log("coin in existInWatchList--", coin);
    for(let item of items){
        if(item?.id === coin?.id){
            return true;
        }
    }
    return false;
}