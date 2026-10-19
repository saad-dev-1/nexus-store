import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./sectionheading";

const lookbookItems = [
  {
    id: 1,
    // Image bilkul wahi hai
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "The Daily Commute",
    // Link ko backend slug se match kiya hai (Headphones)
    link: "/product/soundpro-wireless-headphones", 
  },
  {
    id: 2,
    // Image bilkul wahi hai
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Power On The Go",
    // Link ko backend slug se match kiya hai (Power Bank)
    link: "/product/voltmax-20000mah-power-bank", 
  },
  {
    id: 3,
    // Image bilkul wahi hai
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=compress&cs=tinysrgb&w=800",
    title: "Late Night Focus",
    // Link ko backend slug se match kiya hai (LED Strip)
    link: "/product/smartglow-led-strip", 
  },
  {
    id: 4,
    // Image bilkul wahi hai
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=compress&cs=tinysrgb&w=800",
    title: "Creator Workspace",
    // Iska koi specific product nahi tha, isliye Shop page par bhej rahe hain
    link: "/shop", 
  },
];

export default function Lookbook() {
  return (
    <section className="section-padding border-t border-border bg-bg-primary">
      <div className="container-custom">
        <SectionHeading
          label="The Lookbook"
          title="Curated for your lifestyle"
          subtitle="See how our gear fits into your everyday setup. Hover to shop the look."
        />

        {/* Strict 4-Column Grid for perfect uniformity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {lookbookItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
              // aspect-[4/5] rakha hai taake sab ki height/width ek jaisi ho
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/5] border border-white/5 hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/50"
            >
              <Link to={item.link} className="block w-full h-full">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                />
                
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <div className="flex items-end justify-between">
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-h4 font-bold text-white mb-1">
                        {item.title}
                      </p>
                      <p className="text-tiny text-white/70 uppercase tracking-widest font-semibold">
                        Shop the look
                      </p>
                    </div>
                    
                    {/* Arrow Icon pops in on hover */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45 group-hover:scale-100 scale-50">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}