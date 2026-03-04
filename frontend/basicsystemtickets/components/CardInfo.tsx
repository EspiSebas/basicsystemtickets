interface Props {
  title: string;
  value: number;
  color?: string;
  icon?: React.ReactNode;
}

export const CardInfo = ({ title, value, color = "primary", icon }: Props) => {
  return (
    <div className="col-md-3 mb-4">
      <div
        className={`card border-0 shadow-sm h-100 bg-${color} text-white`}
        style={{ borderRadius: "15px", transition: "0.3s" }}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          
          <div>
            <h6 className="text-uppercase fw-light opacity-75 mb-2">
              {title}
            </h6>
            <h2 className="fw-bold mb-0">{value}</h2>
          </div>

          <div style={{ fontSize: "2rem", opacity: 0.8 }}>
            {icon}
          </div>

        </div>
      </div>
    </div>
  );
};