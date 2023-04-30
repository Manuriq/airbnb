'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
    const registerModal = useRegisterModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return ( 
        <div className="relative">
            <div className="
                flex
                flex-row
                items-center
                gap-3
            ">
                <div
                    onClick={() => console.log('UserMenu')}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Mettre mon logement sur Airbnb
                </div>
                <div
                    onClick={toggleMenu}
                    className="
                        p-4
                        md:py-1
                        md:px2
                        border-[1px]
                        border-neutral-100
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="
                        hidden
                        md:block
                    ">
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md-w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-20
                    text-sm
                ">
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem 
                                onClick={() => {}}
                                label="Connexion"
                            />
                            <MenuItem 
                                onClick={registerModal.open}
                                label="Inscription"
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default UserMenu;