import Link from "next/link";
import Image from 'next/image';
import { contentful } from "../libs/contentful";
import styles from "./../styles/recentPosts.module.scss";
import FormattedDate from "./ui/Date";

export const revalidate = 0;

const RecentPosts = async () => {
  const res = await contentful.getEntries({
    content_type: "blogPost",
  });

  const recentPosts = res.items.slice(0,4).map((item) => ({
    id: item.sys.id,
    label: item.fields.title,
    image: item.fields.featuredImage.fields.file.url,
    date: item.fields.date,
    slug: item.fields.slug,
  }));

  return (
    <div className={styles.recentPosts}>
      <div className={styles.heading}>Recent Posts</div>
      {recentPosts.map((recentPost) => (
        <Link key={recentPost.id} href={`/blogpost/${recentPost.slug}`}>
          <div className={styles.recentPost}>
            <div className={styles.imgContainer}>
              <Image
                className={`image ${styles.bannerimage}`}
                src={"https:" + recentPost.image}
                width={80}
                height={80}
                alt="RecentPostImg"
              />
            </div>
            <div className={styles.desc}>
                <div className={styles.label}>{recentPost.label}</div>
                <FormattedDate date={recentPost.date}/>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentPosts;
