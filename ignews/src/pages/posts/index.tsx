
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

type Post = {
  slug: string,
  title: string,
  excerpet: string,
  updatedAt: string,
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({posts}: PostsProps) {
  return (
    <>
    <Head>
      <title>Posts | Ignews</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.posts}>
        {posts.map(post => (
            <a key={post.slug} href='#'>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
      
          </a>
        ))}
   
      </div>
    </main>
    </>
  )
}

export async function getServerSideProps() {
  const prismic = getPrismicClient()

  const response = await prismic.getByType("publication", {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  });
  console.log(response)
  
  const posts = response.results.map(post => {
    return  {
      slug: post.uid,
      title: post.data.title,
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month:'long',
        year: 'numeric',
      })
    }
  })
  
  return {
    props: { posts },
  };
}