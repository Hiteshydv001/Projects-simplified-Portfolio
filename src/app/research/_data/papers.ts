export const researchPapers = {
  'train-ticket': {
    id: 'train-ticket', emoji: '🚆', year: '2024', image: '/research/train-prediction.jpg', imageAlt: 'Indian Railway train station with passengers',
    title: 'Train Waitlisted Ticket Confirmation Prediction Using Machine Learning',
    conference: 'Second International Conference on Advanced Computing & Communication Technologies (ICACCTech)', publisher: 'IEEE',
    authors: 'Ruchi, Fardin Khan, Hitesh Kumar, Kamalveer Singh, Sachin Yadav', doi: 'https://ieeexplore.ieee.org/document/10918548',
    shortDescription: 'A machine learning framework that predicts waitlisted rail-ticket confirmation, helping passengers plan travel with more confidence.',
    overview: `Millions of Indian railway passengers face uncertainty when travelling with a waitlisted ticket. Confirmation depends on booking behaviour, cancellations, routes, travel dates, and seasonal demand.`,
    contribution: `We developed a machine learning framework that estimates the likelihood of waitlisted tickets being confirmed using historical booking data, cancellation records, and passenger preferences.`,
    model: 'Light Gradient Boosting Machine (LightGBM)', accuracy: '96.67%', features: 'Booking time, travel routes, seasonal demand, and cancellation probabilities',
    impact: ['Reduces uncertainty and improves travel planning for passengers.', 'Supports capacity forecasting and resource management for railway authorities.', 'Creates a foundation for real-time ticketing intelligence.'],
    conclusion: 'This work demonstrates how AI and machine learning can make rail travel smarter, more reliable, and more passenger-friendly.'
  },
  'weather-traffic': {
    id: 'weather-traffic', emoji: '🌦️', year: '2025', image: '/research/weather-traffic.jpg', imageAlt: 'Weather affected traffic conditions visualization',
    title: 'Weather-Integrated Traffic Routing with Dynamic Speed Prediction',
    conference: 'International Conference on Recent Advances in AI (ICRAAI)', status: 'Accepted for publication', domain: 'Smart Cities · Intelligent Transportation Systems',
    shortDescription: 'A weather-aware routing framework that combines environmental conditions with live traffic information for safer navigation.',
    overview: `Navigation systems often optimise for distance or congestion but overlook changing weather. A route that is safe in clear conditions can become hazardous during rain, fog, or high humidity.`,
    contribution: `Our framework combines real-time traffic flow, hyperlocal weather conditions, and static road attributes to produce routing guidance that adapts to the environment.`,
    model: 'Dynamic speed prediction framework', features: 'Live traffic flow, hyperlocal weather data, road type, speed limits, and construction activity',
    impact: ['Prioritises safety in adverse driving conditions.', 'Provides a blueprint for smarter urban traffic systems.', 'Can improve routing for commuters, logistics fleets, and emergency services.'],
    conclusion: 'Weather-aware intelligence is a practical step toward more resilient, safe, and adaptive cities.'
  }
} as const

export type ResearchPaper = typeof researchPapers[keyof typeof researchPapers]
