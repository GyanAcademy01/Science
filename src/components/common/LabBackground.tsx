/** 📐 ગ્રિડ-પેપર + ઝાંખા orbs. Mobile પર CSS દ્વારા બંધ થાય છે. */
export function LabBackground() {
  return (
    <>
      <div className="lab-bg" aria-hidden />
      <div
        className="lab-orb"
        aria-hidden
        style={{
          width: 420,
          height: 420,
          top: -140,
          left: -120,
          background: "#06b6d4",
        }}
      />
      <div
        className="lab-orb"
        aria-hidden
        style={{
          width: 360,
          height: 360,
          top: "38%",
          right: -140,
          background: "#a855f7",
          animationDelay: "-7s",
        }}
      />
      <div
        className="lab-orb"
        aria-hidden
        style={{
          width: 300,
          height: 300,
          bottom: -120,
          left: "28%",
          background: "#10b981",
          animationDelay: "-13s",
        }}
      />
    </>
  );
}
