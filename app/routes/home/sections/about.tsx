import {useState} from "react";
import {Link} from "react-router";

export default function AboutSection() {
    return (
        <section className="relative w-full max-w-7xl mx-auto mt-20 mb-10">
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src="./assets/jamu-hero.jpg"
                    alt="About Image"
                    className="w-full h-100 object-cover"
                />
                <div className=" absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        About Jamu
                    </h2>
                    <p className="text-lg md:text-xl text-white mb-6 max-w-3xl">
                        Jamu is a traditional Indonesian herbal medicine that has been used for centuries to promote health and wellness. Made from natural ingredients such as roots, leaves, flowers, and spices, Jamu offers a holistic approach to healing and prevention. Our mission is to preserve this rich cultural heritage while providing high-quality Jamu products that cater to modern lifestyles.
                    </p>
                    <Link to="/about" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}