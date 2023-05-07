'use client'

import Container from "../Container";

import { IoDiamond } from "react-icons/io5"
import { BsSnow } from "react-icons/bs"
import { FaSkiing } from "react-icons/fa"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Plage",
        icon: TbBeach,
        description: "Cette propriété est proche de la plage"
    },
    {
        label: "Moulin à vent",
        icon: GiWindmill,
        description: "Cette propriété a un moulin à vent"
    },
    {
        label: "Moderne",
        icon: MdOutlineVilla,
        description: "Cette proprété est moderne"
    },
    {
        label: "Montagne",
        icon: TbMountain,
        description: "Cette propriété est à la montagne"
    },
    {
        label: "Piscine",
        icon: TbPool,
        description: "Cette propriété a une piscine"
    },
    {
        label: "Ile",
        icon: GiIsland,
        description: "Cette propriété est sur une île"
    },
    {
        label: "Lac",
        icon: GiBoatFishing,
        description: "Cette propriété est à côté d'un lac"
    },
    {
        label: "Ski",
        icon: FaSkiing,
        description: "Cette propriété a des activités de ski à proximité"
    },
    {
        label: "Château",
        icon: GiCastle,
        description: "Cette propriété est un château"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "Cette propriété est dans un camping"
    },
    {
        label: "Artic",
        icon: BsSnow,
        description: "Cette propriété se situe en Artic"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "Cette propriété est dans une cave"
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "Cette propriété est dans le désert"
    },
    {
        label: "Grange",
        icon: GiBarn,
        description: "Cette propriété a une grange"
    },
    {
        label: "Luxueux",
        icon: IoDiamond,
        description: "Cette propriété est luxueuse"
    }
]

const Categories = () => {
    const params = useSearchParams();
    const currentCategory = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if(!isMainPage) {
        return null;
    }

    return ( 
        <Container>
            <div className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            ">
                {categories.map((category, index) => (
                    <CategoryBox
                        key={index}
                        label={category.label}
                        icon={category.icon}
                        selected={currentCategory === category.label}
                    />
                ))}
            </div>
        </Container>
     );
}
 
export default Categories;