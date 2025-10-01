import React from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

// ✅ Chart.js setup
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ✅ Variants for animation
const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ✅ Animated Section Wrapper
interface AnimatedSectionProps {
  children: ReactNode;
}
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 space-y-4"
      variants={sectionVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
};

// ✅ Chart Section
const ChartSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const data = {
    labels: ["Development", "Testing", "Integration"],
    datasets: [
      {
        label: "Man-Hours",
        data: [60, 25, 15],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  const options:ChartOptions<"bar"> = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Man-Hour Breakdown" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {inView && <Bar data={data} options={options} />}
    </motion.div>
  );
};

// ✅ Timeline Section
const TimelineSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const milestones: string[] = [
    "Week 1: Requirements gathering & dashboard design",
    "Weeks 2-3: Dashboard development (frontend + backend)",
    "Week 4: Integration with internal authentication server",
    "Week 5: Testing & bug fixing",
    "Week 6: Final deployment within intranet",
  ];

  return (
    <div className="relative pl-10" ref={ref}>
      {/* Progress Line */}
      <motion.div
        className="absolute left-3 ml-1.5 mt-1 top-0 w-1 bg-blue-200 rounded-full"
        style={{ height: `${milestones.length * 19}%`, transformOrigin: "top" }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <ol className="list-none space-y-6">
        {milestones.map((item, index) => (
          <motion.li
            key={index}
            className="relative flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.3 }}
          >
            {/* Progress Dot */}
            <span className="absolute -left-7 w-4 h-4 bg-blue-500 rounded-full shadow" />
            <span className="text-gray-700">{item}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

// ✅ Main App
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Daikibo Factory Machine Health Dashboard Proposal
      </motion.h1>

      {/* Overview Section */}
      <AnimatedSection>
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          This proposal outlines the development of a private dashboard to monitor the health
          status of 9 machines in each of Daikibo's 4 factories. The solution will collect telemetry
          data and present it in a user-friendly dashboard accessible only within the client's
          intranet. Authentication will be synced with the internal authentication server, allowing
          employees to use their existing company-wide accounts.
        </p>
      </AnimatedSection>

      {/* Scope Section */}
      <AnimatedSection>
        <h2 className="text-2xl font-semibold">Scope</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Display the current health status of all monitored machines.</li>
          <li>Provide collapsible/expandable views at factory and device levels.</li>
          <li>Show history of status changes for each machine.</li>
          <li>Ensure access is restricted to internal users via authentication sync.</li>
          <li>Design a single-page, responsive dashboard accessible from desktop browsers.</li>
        </ul>
      </AnimatedSection>

      {/* Estimate Section */}
      <AnimatedSection>
        <h2 className="text-2xl font-semibold">Man-Hour Estimate</h2>
        <ChartSection />
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Task</th>
              <th className="border-b p-2">Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b p-2">Development</td>
              <td className="border-b p-2">60 hrs</td>
            </tr>
            <tr>
              <td className="border-b p-2">Testing</td>
              <td className="border-b p-2">25 hrs</td>
            </tr>
            <tr>
              <td className="border-b p-2">Integration</td>
              <td className="border-b p-2">15 hrs</td>
            </tr>
            <tr>
              <td className="border-b p-2 font-bold">Total</td>
              <td className="border-b p-2 font-bold">100 hrs</td>
            </tr>
          </tbody>
        </table>
      </AnimatedSection>

      {/* Timeline Section */}
      <AnimatedSection>
        <h2 className="text-2xl font-semibold">Timeline</h2>
        <TimelineSection />
      </AnimatedSection>

      {/* Support Section */}
      <AnimatedSection>
        <h2 className="text-2xl font-semibold">Support</h2>
        <p>
          After deployment, we will provide ongoing support, including bug fixes, ticket-based
          resolution, and implementation of new functionality as required to ensure the dashboard
          remains up-to-date and reliable.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
          Contact Us
        </button>
      </AnimatedSection>
    </div>
  );
};

export default App;
