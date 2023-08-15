import Link from "next/link";
import Image from 'next/image';
import { contentful } from "/libs/contentful";
import styles from "/app/styles/recentPosts.module.scss";
import FormattedDate from "/components/ui/Date";
import { LayoutList } from "lucide-react";

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
      <div className={styles.heading}><LayoutList /> Recent Posts</div>
      {recentPosts.map((recentPost) => (
        <Link key={recentPost.id} href={`/blogpost/${recentPost.slug}`}>
          <div className={styles.recentPost}>
            
              <Image
                className={`image ${styles.bannerimage}`}
                src={"https:" + recentPost.image}
                width={50}
                height={50}
                alt="RecentPostImg"
              />
            
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
