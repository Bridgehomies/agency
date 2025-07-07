import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const ContactInfo = () => (
    <div className="flex space-x-4">
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <FaPhoneAlt className="text-xl" />
            </div>
            <div>
                <div className="text-sm text-blue-200">Call us at</div>
                <div className="font-bold">+92 342 9263395</div>
            </div>
        </div>
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <IoMdMail className="text-xl" />
            </div>
            <div>
                <div className="text-sm text-blue-200">Email us at</div>
                <div className="font-bold">homiesbridge@gmail.com</div>
            </div>
        </div>
    </div>
);

const ContactForm = () => (
    <form className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h3>
        <div className="mb-4">
            <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
        </div>
        <div className="mb-4">
            <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
        </div>
        <div className="mb-4">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black/40">
                <option>What service are you interested in?</option>
                <option>UI Design</option>
                <option>UX Design</option>
                <option>Mobile App Design</option>
                <option>Conversion-Driven Design</option>
                <option>Other</option>
            </select>
        </div>
        <div className="mb-4">
            <textarea
                rows={4}
                placeholder="Tell us about your project"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            ></textarea>
        </div>
        <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition"
        >
            Send Message
        </button>
    </form>
);

const Form = () => (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Design?</h2>
                    <p className="text-blue-100 mb-6">
                        Let's discuss how we can help you achieve your business goals.
                    </p>
                    <ContactInfo />
                </div>
                <div className="md:w-1/2 md:pl-12">
                    <ContactForm />
                </div>
            </div>
        </div>
    </section>
);

export default Form;