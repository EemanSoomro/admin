import "./statsCard.css";

export default function StatsCard({ title, count }) {
  return (
    <div className="statsCard">
      <h2 className="statsTitle">{title}</h2>
      <p className="statsCount">{count}</p>
    </div>
  );
}
