import { Image } from "react-bootstrap";
import linkden from "../assets/linkden.png";

interface TeamMemberProps {
    image: string;
    name: string;
    position: string;
    linkedinUrl?: string;
}

const Team = ({ image, name, position, linkedinUrl = "#" }: TeamMemberProps) => {
    return (
        <div className="team-member text-center">
            <Image src={image} alt={name} className="img-fluid mb-3" />
            <h4>{name}</h4>
            <p className="position">{position}</p>
            <a href={linkedinUrl} className="linkedin-link">
                <Image src={linkden} />
            </a>
        </div>
    );
};

export default Team;
