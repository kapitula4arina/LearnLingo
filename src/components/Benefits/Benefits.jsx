import css from "./Benefits.module.css";

const benefits = [
  {
    value: "32,000 +",
    description: "Experienced tutors",
    textWidth: "96px",
  },
  {
    value: "300,000 +",
    description: "5-star tutor reviews",
    textWidth: "96px",
  },
  {
    value: "120 +",
    description: "Subjects taught",
    textWidth: "74px",
  },
  {
    value: "200 +",
    description: "Tutor nationalities",
    textWidth: "74px",
  },
];

const Benefits = () => {
  return (
    <section className={css.section}>
      <div className="container containerSection">
        <div className={css.wrapper}>
          <ul className={css.list}>
            {benefits.map(({ value, description, textWidth }) => (
              <li className={css.item} key={value}>
                <p className={css.value}>{value}</p>
                <p className={css.description} style={{ width: textWidth }}>
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
