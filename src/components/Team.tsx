import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import linkden from "../assets/linkden.png";

interface TeamMemberProps {
    image: string;
    name: string;
    position: string;
    linkedinUrl?: string;
}

const Team = ({ image, name, position, linkedinUrl = "#" }: TeamMemberProps) => {
    const { t } = useTranslation();

    return (
        <div className="team-member text-center">
            <Image src={image} alt={name} className="img-fluid mb-3" />
            <h4>{name}</h4>
            <p className="position">{position}</p>
            <a href={linkedinUrl} className="linkedin-link" title={t("components.team.viewProfile")}>
                <Image src={linkden} alt={t("components.team.viewProfile")} />
            </a>
        </div>
    );
};

export default Team;
