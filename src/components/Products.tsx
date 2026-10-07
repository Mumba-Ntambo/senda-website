import type { CSSProperties } from "react";

import { Backdrop } from "@/components/Backdrop";
import { content } from "@/shared/content";
import { productIcons } from "@/shared/productIcons";
import styles from "@/styles/Products.module.css";

/* The products page: a short dark band carrying the page title, then
   one light section per product. The band is the home hero's field at
   reduced height, so the two pages open on the same surface. */
export async function Products() {
  const { site, products } = await content();

  return (
    <>
      <section className={styles.hero} aria-labelledby="products-title">
        <Backdrop className={styles.canvas} />
        <div className={styles.vignette} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{site.productsEyebrow}</p>
          <h1 className={styles.headline} id="products-title">
            {site.productsTitle}
            <span className={styles.headlineEmphasis}>
              {site.productsTitleEmphasis}
            </span>
          </h1>
          <p className={styles.subhead}>{site.productsSubhead}</p>
        </div>
      </section>

      {products.map((product) => (
        <section
          className={styles.product}
          id={product.slug}
          aria-labelledby={`${product.slug}-title`}
          key={product.slug}
        >
          <div className={styles.inner}>
            <div className={styles.intro}>
              <div className={styles.copy} data-reveal="left">
                <p className={styles.category}>{product.category}</p>
                <h2 className={styles.name} id={`${product.slug}-title`}>
                  {product.name}
                </h2>
                <p className={styles.tagline}>{product.tagline}</p>
                <p className={styles.summary}>{product.summary}</p>

                <div className={styles.actions}>
                  <a className={styles.cta} href={product.ctaHref}>
                    {product.ctaLabel}
                  </a>

                  {/* The product's own site, so it opens beside this
                      one rather than replacing it. */}
                  <a
                    className={styles.site}
                    href={product.siteHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {product.siteLabel}
                    <svg
                      className={styles.siteIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                </div>
              </div>

              <ul className={styles.highlights} data-reveal="right">
                {product.highlights.map((highlight) => (
                  <li className={styles.highlight} key={highlight}>
                    <svg
                      className={styles.tick}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className={styles.partsTitle} data-reveal="">
              {product.partsTitle}
            </h3>

            <ul className={styles.parts}>
              {product.parts.map((part, index) => (
                <li
                  className={styles.part}
                  data-reveal=""
                  style={
                    { "--reveal-delay": `${index * 110}ms` } as CSSProperties
                  }
                  key={part.title}
                >
                  <span className={styles.partIcon} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {productIcons[part.icon]}
                    </svg>
                  </span>
                  <p className={styles.partAudience}>{part.audience}</p>
                  <h4 className={styles.partTitle}>{part.title}</h4>
                  <p className={styles.partBody}>{part.body}</p>

                  {part.href ? (
                    <a
                      className={styles.partLink}
                      href={part.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {/* The bare host is the label: it says where the
                          link goes better than "Open" would. */}
                      {part.href.replace("https://", "")}
                      <span className="visually-hidden">
                        : {part.title}
                      </span>
                      <svg
                        className={styles.siteIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
