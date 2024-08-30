import { HeartIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { WishListContext } from "../../context/WishListContext";
import useCart from "../../hooks/useCart";
import LogoIcon from "../../icons/LogoIcon";
import Cart from "../cart/Cart";
import SignIn from "../SignIn";
import SearchBar from "./SearchBar";

export default function Header() {
	const [username, setUsername] = useState();
	const { handleModal } = useContext(ModalContext);
	const { cartCount } = useCart();
	const { wishListContent } = useContext(WishListContext);

	function handleSignInModal() {
		if (!username) {
			handleModal(<SignIn setUsername={setUsername} />, false);
		}
	}

	return (
		<div className="h-20 text-white bg-red-800">
			<div className="container flex flex-row items-center justify-between py-4">
				<Link
					to="/"
					className="flex flex-row"
				>
					<LogoIcon />

					<span className="font-bold">Book Store</span>
				</Link>

				<SearchBar />

				<div className="flex flex-row items-baseline justify-around text-xs w-36">
					<button
						className={`flex flex-col items-center ${username ? 'cursor-default' : 'cursor-pointer'}`}
						onClick={handleSignInModal}
						disabled={!!username}
					>
						<UserIcon className="h-7" />

						<p>{username || 'Sign In'}</p>
					</button>

					<Link
						to="/wish-list"
						className="relative flex flex-col items-center p-1 cursor-pointer"
					>
						<HeartIcon className="h-7" />

						<span
							className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs bg-blue-900 rounded-xl"
						>
							{wishListContent.length}
						</span>

						<p>Wish List</p>
					</Link>

					<button
						className="relative flex flex-col items-center p-1 cursor-pointer"
						onClick={() => handleModal(<Cart />, false)}
					>
						<ShoppingCartIcon className="h-7" />

						<span
							className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs bg-blue-900 rounded-xl"
						>
							{cartCount}
						</span>

						<p>Cart</p>
					</button>
				</div>
			</div>
		</div>
	)
}
