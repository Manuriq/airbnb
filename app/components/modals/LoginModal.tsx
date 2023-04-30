'use client'

import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import { toast } from "react-hot-toast";
import { error } from "console";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setIsLoading(true);
        
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((response) => {
            if (response?.error) {
                toast.error(response.error);
            } else {
                toast.success("Vous êtes connecté !");
                router.refresh();
                LoginModal.close();
            }
        }).catch((error) => {
            toast.error(error);
        }).finally(() => {
            setIsLoading(false);
        });

    }, []);
    

    const bodyContent = (
        <div className="
            flex flex-col gap-4
        ">
            <Heading 
                title="Bienvenue sur AirBnB"
                subtitle="Se connecter"
             />
             <Input 
                id="email"
                label="Email"
                type="email"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
             />
             <Input 
                id="password"
                label="Mot de passe"
                type="password"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
             />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label="Se connecter avec Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label="Se connecter avec Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className="
                text-neutral-500
                text-center
                mt-4
                font-light
            ">
                <div className="
                    flex
                    flex-row 
                    justify-center
                    items-center 
                    gap-2">
                    <div>
                        Vous avez déjà un compte ?
                    </div>
                    <div 
                    onClick={LoginModal.close}
                    className="
                        text-neutral-800
                        cursor-pointer
                        hover:underline
                    ">
                        Se connecter!
                    </div>
                </div>
            </div>
        </div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Connexion"
            actionLabel="Continuer"
            onClose={LoginModal.close}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default LoginModal;