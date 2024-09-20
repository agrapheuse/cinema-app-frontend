interface CinemaCardProps {
    toggled: boolean
}

export default function CinemaCard({} : CinemaCardProps) {
    return (
        <div
            key={cinema}
            className="cinema-card"
            onClick={() => handleCinemaToggle(cinema)}
        >
            <div className="cinema-card-content">
                <h3 className="cinema-card-title">{cinema}</h3>
            </div>
        </div>

    )
}