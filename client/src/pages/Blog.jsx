import React from 'react';

const Blog = () => {
  const posts = [
    {
      category: 'FASHION',
      title: 'Top 10 Fashion Trends for 2026',
      excerpt: "I've been looking into how sustainability is completely shifting what we wear. From upcycled materials making a comeback to minimalist capsules taking over, here's my take on the new aesthetic.",
      author: 'Liam Harrison',
      date: 'October 12, 2025',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
      color: 'var(--primary)'
    },
    {
      category: 'LIFESTYLE',
      title: 'Building a Minimalist Wardrobe',
      excerpt: 'Ever open your wardrobe and feel overwhelmed? I tried stripping my clothes down to just 30 essential pieces, and it practically changed my morning routine. Here is what I learned.',
      author: 'Chloe Bennett',
      date: 'September 28, 2025',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlmZXN0eWxlfGVufDB8fDB8fHww',
      color: 'var(--secondary)'
    },
    {
      category: 'TECHNOLOGY',
      title: 'Must-Have Tech Accessories',
      excerpt: 'As a developer, my desk is always cluttered with cables and chargers. I finally found some sleek desk accessories that actually look good next to my laptop. Check them out!',
      author: 'Marcus Cole',
      date: 'September 15, 2025',
      image: 'https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
      color: 'var(--text-main)'
    }
  ];

  return (
    <main>
      <section className="hero" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-main)' }}>MiniShop Journal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Dive into my personal insights, project updates, and fresh perspectives on modern lifestyle trends.
          </p>
        </div>
      </section>

      <section className="container" style={{ margin: '4rem auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {posts.map((post, index) => (
            <article key={index} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface)' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <span style={{ background: 'var(--bg-color)', color: post.color, padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                  {post.category}
                </span>
                <h2 style={{ margin: '1rem 0 0.5rem', fontSize: '1.5rem' }}>{post.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{post.excerpt}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  By {post.author} • {post.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blog;
