'use client'

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import { toast } from "react-hot-toast";
import { error } from "console";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setIsLoading(true);
        
        axios.post("/api/register", data)
            .then((res) => {
                toast.success("Bienvenue sur le site!")
                registerModal.close();
            })
            .catch((err) => {
                toast.error("Quelque chose c'est mal passé")
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    

    const bodyContent = (
        <div className="
            flex flex-col gap-4
        ">
            <Heading 
                title="Bienvenue sur AirBnB"
                subtitle="Créer un compte"
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
                id="name"
                label="Nom"
                type="text"
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
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label="Se connecter avec Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
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
                    onClick={loginModal.open}
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
            isOpen={registerModal.isOpen}
            title="Inscription"
            actionLabel="Continuer"
            onClose={registerModal.close}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;