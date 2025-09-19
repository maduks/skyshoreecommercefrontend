'use client';

import React from 'react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    <div className="main-content_wrapper">
      <div className="breadcrumb-area breadcrumb-height">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-12">
              <div className="breadcrumb-item">
                <h2 className="breadcrumb-heading">Privacy Policy</h2>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-policy-area section-space-y-axis-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-policy-content">
                <h3 className="title">Privacy Policy</h3>
                <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="policy-section">
                  <h4>1. Information We Collect</h4>
                  <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:</p>
                  <ul>
                    <li>Name, email address, and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information</li>
                    <li>Order history and preferences</li>
                    <li>Communications with our customer service team</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h4>2. How We Use Your Information</h4>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send order confirmations and updates</li>
                    <li>Improve our products and services</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h4>3. Information Sharing</h4>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                  <ul>
                    <li>With your explicit consent</li>
                    <li>To trusted third-party service providers who assist us in operating our website and serving you</li>
                    <li>To comply with legal requirements or protect our rights</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h4>4. Data Security</h4>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                  <ul>
                    <li>Encryption of sensitive data</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Secure payment processing</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h4>5. Your Rights</h4>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access and review your personal information</li>
                    <li>Update or correct inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h4>6. Cookies and Tracking</h4>
                  <p>We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
                </div>

                <div className="policy-section">
                  <h4>7. Third-Party Links</h4>
                  <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.</p>
                </div>

                <div className="policy-section">
                  <h4>8. Children&apos;s Privacy</h4>
                  <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
                </div>

                <div className="policy-section">
                  <h4>9. Changes to This Policy</h4>
                  <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.</p>
                </div>

                <div className="policy-section">
                  <h4>10. Contact Us</h4>
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                  <ul>
                    <li>Email: privacy@skyshore.com</li>
                    <li>Phone: +234-801-234-5678</li>
                    <li>Address: 123 Main Street, Lagos, Nigeria</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 