import Item from "./Item";
import { useGlobalContext } from "./context";

export const useContainer = () => {
    const { left, products } = useGlobalContext();
    const container = (
     products.length > 0 ? (
        <ul className="cart" style={{left: `${left}px`, width: `${products.length*200}px`}}>
          {products.map((item) => {
            return <Item key={item.id} {...item} />
          })}
        </ul>
      ) : (
        <div className="empty"> No more twinkies ! </div>
      ) 
    )
    return {container}
}