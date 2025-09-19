'use client';

import React from 'react';
import Link from 'next/link';

const TermsConditionsPage = () => {
  return (
    <div className="main-content_wrapper">
      <div className="breadcrumb-area breadcrumb-height">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-12">
              <div className="breadcrumb-item">
                <h2 className="breadcrumb-heading">Terms & Conditions</h2>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="terms-conditions-area section-space-y-axis-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="terms-conditions-content">
                <h3 className="title">Terms and Conditions</h3>
                <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="terms-section">
                  <h4>1. Acceptance of Terms</h4>
                  <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                </div>

                <div className="terms-section">
                  <h4>2. Use License</h4>
                  <p>Permission is granted to temporarily download one copy of the materials (information or software) on SkyShore Lubricants&apos; website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul>
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                  </ul>
                </div>

                <div className="terms-section">
                  <h4>3. Product Information</h4>
                  <p>We strive to provide accurate product information, including descriptions, prices, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.</p>
                </div>

                <div className="terms-section">
                  <h4>4. Pricing and Payment</h4>
                  <p>All prices are subject to change without notice. Payment must be made at the time of order placement. We accept various payment methods as indicated on our website. By placing an order, you authorize us to charge your payment method for the total amount of your order.</p>
                </div>

                <div className="terms-section">
                  <h4>5. Shipping and Delivery</h4>
                  <p>We will make every effort to ship your order within the specified timeframe. However, delivery times are estimates and may vary due to factors beyond our control. We are not responsible for delays caused by shipping carriers or other third parties.</p>
                </div>

                <div className="terms-section">
                  <h4>6. Returns and Refunds</h4>
                  <p>We accept returns within 30 days of purchase for unused items in their original packaging. Return shipping costs are the responsibility of the customer unless the item was received damaged or incorrect. Refunds will be processed within 5-7 business days of receiving the returned item.</p>
                </div>

                <div className="terms-section">
                  <h4>7. User Accounts</h4>
                  <p>When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
                </div>

                <div className="terms-section">
                  <h4>8. Prohibited Uses</h4>
                  <p>You may not use our website:</p>
                  <ul>
                    <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material</li>
                    <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                    <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the website</li>
                  </ul>
                </div>

                <div className="terms-section">
                  <h4>9. Intellectual Property</h4>
                  <p>The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of SkyShore Lubricants and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
                </div>

                <div className="terms-section">
                  <h4>10. Limitation of Liability</h4>
                  <p>In no event shall SkyShore Lubricants, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website.</p>
                </div>

                <div className="terms-section">
                  <h4>11. Disclaimer</h4>
                  <p>The materials on SkyShore Lubricants&apos; website are provided on an &apos;as is&apos; basis. SkyShore Lubricants makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                </div>

                <div className="terms-section">
                  <h4>12. Governing Law</h4>
                  <p>These terms and conditions are governed by and construed in accordance with the laws of Nigeria and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                </div>

                <div className="terms-section">
                  <h4>13. Changes to Terms</h4>
                  <p>We reserve the right to modify these terms and conditions at any time. We will notify users of any material changes by posting the new terms on this page and updating the &quot;Last updated&quot; date.</p>
                </div>

                <div className="terms-section">
                  <h4>14. Contact Information</h4>
                  <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                  <ul>
                    <li>Email: legal@skyshore.com</li>
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

export default TermsConditionsPage; 