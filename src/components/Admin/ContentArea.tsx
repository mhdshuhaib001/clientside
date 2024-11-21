import React from 'react';

const ContentArea: React.FC = () => {
  return (
    <main className="flex-1 bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Content Area</h1>
      <p>
        This is the content area where you can display anything you want, such
        as details, forms, charts, or other components. Customize this area as
        per your requirements.
      </p>
    </main>
  );
};

export default ContentArea;
