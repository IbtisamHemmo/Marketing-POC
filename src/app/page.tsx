import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
export const dynamic = 'force-dynamic'

async function getPageData() {
  const query = `{
    "hero": *[_type == "hero"][0] {
      title,
      subtitle,
      description,
      ctaText,
      ctaLink,
      heroImage {
        asset -> {
          _id,
          url
        },
        alt
      }
    },
    "about": *[_type == "about"][0] {
      title,
      description,
      image {
        asset -> {
          _id,
          url
        },
        alt
      }
    },
    "features": *[_type == "features"][0] {
      title,
      subtitle,
      featuresList[] {
        title,
        description,
        icon
      }
    },
    "testimonials": *[_type == "testimonials"][0] {
      title,
      subtitle,
      testimonialsList[] {
        name,
        role,
        company,
        content,
        rating,
        image {
          asset -> {
            _id,
            url
          },
          alt
        }
      }
    },
    "banner": *[_type == "banner"][0] {
      title,
      description,
      ctaText,
      ctaLink,
      bannerType,
      isVisible,
      images[] {
        asset -> {
          _id,
          url
        },
        alt
      }
    },
    "contact": *[_type == "contact"][0] {
      title,
      description,
      email,
      phone,
      address
    },
    "siteSettings": *[_type == "siteSettings"][0] {
      siteName,
      logo {
        asset -> {
          _id,
          url
        },
        alt
      },
      footerText
    }
  }`;

  return client.fetch(query);
}

export default async function HomePage() {
  const data = await getPageData()
  const { hero, about, features, testimonials, banner, contact, siteSettings } =
    data;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              {siteSettings?.logo && (
                <Image
                  src={siteSettings.logo.asset.url}
                  alt={siteSettings.logo.alt || "FloraFlow Logo"}
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              )}
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Contact
              </a>
            </nav>
            <button className="md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Conditional Banner/Carousel */}
      {banner &&
        banner.isVisible &&
        (banner.title || banner.images?.length > 0) && (
          <div className="mt-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            {banner.bannerType === "carousel" && banner.images?.length > 0 ? (
              <div className="relative overflow-hidden">
                <div className="flex animate-pulse">
                  {banner.images.map(
                    (
                      image: {
                        asset: { url: string };
                        alt?: string;
                      },
                      index: number
                    ) => (
                      <div key={index} className="min-w-full relative h-64">
                        <Image
                          src={image.asset.url}
                          alt={image.alt || `Banner image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {banner.title && (
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center">
                              <h2 className="text-3xl font-bold mb-2">
                                {banner.title}
                              </h2>
                              {banner.description && (
                                <p className="text-lg mb-4">
                                  {banner.description}
                                </p>
                              )}
                              {banner.ctaText && banner.ctaLink && (
                                <Link
                                  href={banner.ctaLink}
                                  className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                  {banner.ctaText}
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                  {banner.title && (
                    <h2 className="text-3xl font-bold mb-4">{banner.title}</h2>
                  )}
                  {banner.description && (
                    <p className="text-lg mb-6">{banner.description}</p>
                  )}
                  {banner.ctaText && banner.ctaLink && (
                    <Link
                      href={banner.ctaLink}
                      className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      {banner.ctaText}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      {/* Hero Section */}
      <section
        className={`${banner && banner.isVisible ? "pt-8" : "pt-24"} pb-20 bg-gradient-to-br from-green-50 to-emerald-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {hero?.title || "Transform Your Space with FloraFlow"}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {hero?.description ||
                  "Discover premium plants, expert care guides, and create your perfect green sanctuary. From indoor gardens to outdoor landscapes."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={hero?.ctaLink || "#features"}
                  className="inline-flex items-center px-8 py-3 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  style={{ backgroundColor: "#3c5a4d" }}
                >
                  {hero?.ctaText || "Explore Plants"}
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center px-8 py-3 border-2 font-semibold rounded-lg hover:bg-green-200 hover:text-white transition-colors"
                  style={{ border: "2px solid #3c5a4d", color: "#3c5a4d" }}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              {hero?.heroImage ? (
                <Image
                  src={hero.heroImage.asset.url}
                  alt={hero.heroImage.alt || "FloraFlow Hero"}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-2xl flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {about && (
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {about.image && (
                  <Image
                    src={about.image.asset.url}
                    alt={about.image.alt || "About FloraFlow"}
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-lg"
                  />
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {about.title || "About FloraFlow"}
                </h2>
                <div className="prose prose-lg text-gray-600">
                  {about.description ||
                    "At FloraFlow, we believe that every space deserves the beauty and tranquility that plants bring. Our mission is to make plant care accessible, enjoyable, and successful for everyone, whether you're a seasoned gardener or just starting your green journey."}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {features?.title || "Why Choose FloraFlow?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {features?.subtitle ||
                "Everything you need to create and maintain your perfect plant paradise"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features?.featuresList?.map(
              (
                feature: {
                  title: string;
                  description: string;
                  icon?: string;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-2xl">{feature.icon || "🌱"}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            ) ||
              [
                {
                  title: "Premium Plant Selection",
                  description:
                    "Curated collection of healthy, beautiful plants sourced from trusted growers.",
                  icon: "🌿",
                },
                {
                  title: "Expert Care Guides",
                  description:
                    "Detailed care instructions and tips from horticultural experts.",
                  icon: "📖",
                },
                {
                  title: "Plant Health Monitoring",
                  description:
                    "Track your plants' health with our smart monitoring tools.",
                  icon: "📊",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.testimonialsList?.length > 0 && (
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {testimonials.title || "What Our Customers Say"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {testimonials.subtitle ||
                  "Join thousands of happy plant parents who trust FloraFlow"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.testimonialsList.map(
                (
                  testimonial: {
                    name: string;
                    role?: string;
                    company?: string;
                    content: string;
                    rating?: number;
                    image?: {
                      asset: { url: string };
                      alt?: string;
                    };
                  },
                  index: number
                ) => (
                  <div key={index} className="bg-gray-50 p-8 rounded-xl">
                    <div className="flex items-center mb-4">
                      {testimonial.image && (
                        <Image
                          src={testimonial.image.asset.url}
                          alt={testimonial.image.alt || testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full mr-4"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {testimonial.role}{" "}
                          {testimonial.company && `at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                    {testimonial.rating && (
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 italic">
                      `{testimonial.content}`
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact && (
        <section id="contact" className="py-20 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {contact.title || "Get in Touch"}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {contact.description ||
                  "Have questions about plants or need personalized advice? We're here to help!"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contact.email && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Email Us
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-green-600 hover:text-green-700"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {contact.phone && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Call Us
                  </h3>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-green-600 hover:text-green-700"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {contact.address && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Visit Us
                  </h3>
                  <p className="text-gray-600">{contact.address}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                {siteSettings?.logo && (
                  <Image
                    src={siteSettings.logo.asset.url}
                    alt={siteSettings.logo.alt || "FloraFlow Logo"}
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                )}
              </div>
              <p className="text-gray-400 mb-6">
                {siteSettings?.footerText ||
                  "Transform your space with beautiful, healthy plants. Expert care guides and premium selections for every plant lover."}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.753 2.295c-.244.945-.896 2.126-1.335 2.856C9.503 23.85 10.748 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Plant Care</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Care Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Plant Health
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Troubleshooting
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Seasonal Tips
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              &copy; 2025 {siteSettings?.siteName || "FloraFlow"}. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
