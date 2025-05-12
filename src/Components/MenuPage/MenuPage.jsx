import MenuManager from "../MenuManager/MenuManager";
import { menuItems  } from "../../data/menuItems";


export default function MenuPage() {
  return (
    <div className="menu-page">
      <MenuManager menuItems={menuItems } />
    </div>
  );
}