import { Link } from "react-router-dom";
import css from "./Hero.module.css";
import heroImage from "../../assets/block.jpg"; // заміни шлях, якщо треба

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={`container containerSection`}>
        <div className={css.inner}>
          <div className={css.content}>
            <h1 className={css.title}>
              Unlock your potential with the best{" "}
              <span className={css.badge}>language</span> tutors
            </h1>
            <p className={css.text}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link to="/teachers" className={css.ctaBtn}>
              Get started
            </Link>
          </div>

          <div className={css.imageWrapper}>
            <img
              src={heroImage}
              alt="Language learning"
              className={css.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
