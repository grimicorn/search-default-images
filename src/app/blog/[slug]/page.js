import blogs from "@/fixtures/blogs.js";

export const getStaticPaths = async () => {
  return {
    paths: blogs.map((blog) => {
      return {
        params: {
          slug: blog.slug,
        },
      };
    }),
    fallback: true, // false or "blocking"
  };
};

export default async function BlogDetail({ params }) {
  const { slug } = await params;

  const blog = blogs.find((blog) => blog.slug === slug);

  return (
    <div>
      <h1>{blog.title}</h1>
    </div>
  );
}
