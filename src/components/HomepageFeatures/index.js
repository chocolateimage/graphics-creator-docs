import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Turn your text into motion',
    video: "/videos/create-awesome-looking-visual-effects.webm",
    description: (
      <>
        From shapes and effects to text, every property is animatable, giving you full control.
      </>
    ),
  },
  {
    title: 'Rich effects library',
    video: "/videos/effects.webm",
    description: (
      <>
        Drop an effect onto your element, and let your creativity unfold. The effects library has everything you need.
      </>
    ),
  },
  {
    title: 'Cross Platform',
    image: "/img/cross-platform.png",
    description: (
      <>
        Graphics Creator is designed to run on both Windows and Linux.
      </>
    ),
  },
];

function Feature({image, video, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureContainer}>
        {video ? <div className={styles.featureVideoContainer}><video muted autoPlay loop src={video} className={styles.featureVideo}></video></div> : <img className={styles.featureSvg} src={image} role="img" />}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
