import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getSubscription, updateSubscription } from '../api/subscription';
import { FiCheck, FiXCircle } from 'react-icons/fi';
import { FaUser, FaUsers, FaBuilding } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentForm = ({ plan, onSuccess, onError, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: billingInfo.name,
                    email: billingInfo.email,
                    address: {
                        line1: billingInfo.address,
                        city: billingInfo.city,
                        state: billingInfo.state,
                        postal_code: billingInfo.postalCode,
                    },
                },
            });

            if (error) {
                onError(error.message);
                setLoading(false);
                return;
            }

            onSuccess(paymentMethod);
        } catch (err) {
            onError('Failed to process payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
                <AiOutlineClose size={24} />
            </button>
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                    Payment Details for {plan.name}
                </h2>
                
                {/* Name Field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={billingInfo.name}
                        onChange={handleChange}
                        required
                        className="p-3 mt-1 w-full border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={billingInfo.email}
                        onChange={handleChange}
                        required
                        className="p-3 mt-1 w-full border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>

                {/* Address Field */}
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleChange}
                        required
                        className="p-3 mt-1 w-full border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>

                {/* City Field */}
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleChange}
                        required
                        className="p-3 mt-1 w-full border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                </div>

                {/* State and Postal Code Fields */}
                <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            State
                        </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={billingInfo.state}
                            onChange={handleChange}
                            required
                            className="p-3 mt-1 w-full border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={billingInfo.postalCode}
                            onChange={handleChange}
                            required
                            className="p-3 mt-1 w-full border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                {/* Card Element */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Card Details
                    </label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': { color: '#aab7c4' },
                                },
                                invalid: { color: '#fa755a' },
                            },
                        }}
                        className="p-3 border rounded bg-gray-50 dark:bg-gray-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold"
                >
                    {loading ? 'Processing...' : 'Confirm Payment'}
                </button>
            </form>
        </div>
    );
};

const Subscription = () => {
    const [currentPlan, setCurrentPlan] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [expiryDate, setExpiryDate] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            plan_id: 1,
            name: 'Personal',
            description: 'Basic features for individual users.',
            price: 9.99,
            features: ['Secure password storage', 'Single user access', 'Basic support'],
            icon: <FaUser className="text-4xl text-blue-500" />,
        },
        {
            plan_id: 2,
            name: 'Team',
            description: 'Features for small teams and collaboration.',
            price: 19.99,
            features: [
                'Secure password storage',
                'Team sharing',
                'Role-based access controls',
                'Priority support',
            ],
            icon: <FaUsers className="text-4xl text-green-500" />,
        },
        {
            plan_id: 3,
            name: 'Business',
            description: 'Advanced features for large organizations.',
            price: 49.99,
            features: [
                'Secure password storage',
                'Team sharing',
                'Role-based access controls',
                'Audit logs',
                'Dedicated account manager',
            ],
            icon: <FaBuilding className="text-4xl text-yellow-500" />,
        },
    ];

    useEffect(() => {
        const fetchCurrentPlan = async () => {
            try {
                const subscription = await getSubscription();
                setCurrentPlan(subscription.plan_name);
                setExpiryDate(subscription.expires_at);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch subscription.');
            }
        };

        fetchCurrentPlan();
    }, []);

    const handleSuccess = async (paymentMethod) => {
        try {
            const expiry = new Date();
            expiry.setMonth(expiry.getMonth() + 1);

            await updateSubscription({
                plan_id: selectedPlan.plan_id,
                plan_name: selectedPlan.name,
                expires_at: expiry.toISOString(),
            });

            setCurrentPlan(selectedPlan.name);
            setExpiryDate(expiry.toISOString());
            setSuccessMessage('Subscription updated successfully!');
            setShowPaymentForm(false);
        } catch (err) {
            setError('Failed to update subscription. Please try again.');
        }
    };

    const handleCancelPlan = async () => {
        try {
            await updateSubscription({
                plan_id: null,
                plan_name: null,
                expires_at: null,
            });

            setCurrentPlan(null);
            setExpiryDate(null);
            setSuccessMessage('Subscription cancelled successfully!');
        } catch (err) {
            setError('Failed to cancel subscription. Please try again.');
        }
    };

    const handleError = (message) => {
        setError(message);
    };

    const closePaymentForm = () => {
        setShowPaymentForm(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closePaymentForm();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="flex-grow p-8 lg:p-16 mx-4 lg:mx-24">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Subscription Plans</h1>

            {error && (
                <div className="mb-6 text-red-500 flex items-center">
                    <FiXCircle className="mr-2" />
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="mb-6 text-green-500 flex items-center">
                    <FiCheck className="mr-2" />
                    {successMessage}
                </div>
            )}

            <div className="mb-8">
                {currentPlan ? (
                    <p className="text-gray-600 dark:text-gray-300">
                        Current Plan: <strong>{currentPlan}</strong>{' '}
                        {expiryDate && (
                            <>
                                (Expires on{' '}
                                <span className="text-blue-500 dark:text-blue-400">
                                    {new Date(expiryDate).toLocaleDateString()}
                                </span>
                                )
                            </>
                        )}
                    </p>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">No active subscription found.</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.plan_id}
                        className={`p-6 rounded-lg shadow h-[30rem] flex flex-col justify-between bg-gray-200 dark:bg-gray-800 hover:shadow-lg transition-all`}
                    >
                        <div>
                            <div className="flex justify-center mb-4">{plan.icon}</div>
                            <h2 className="text-2xl font-semibold mb-4 text-center">{plan.name}</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">{plan.description}</p>
                            <ul className="mb-4 list-disc list-inside text-gray-600 dark:text-gray-300">
                                {plan.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-center text-gray-800 dark:text-gray-100 font-bold text-xl mb-4">
                                ${plan.price} / month
                            </p>
                            {currentPlan === plan.name ? (
                                <button
                                    onClick={handleCancelPlan}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded transition-all"
                                >
                                    Cancel Plan
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setSelectedPlan(plan);
                                        setShowPaymentForm(true);
                                    }}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition-all"
                                >
                                    Choose Plan
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showPaymentForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-full max-w-md relative">
                        <Elements stripe={stripePromise}>
                            <PaymentForm
                                plan={selectedPlan}
                                onSuccess={handleSuccess}
                                onError={handleError}
                                onClose={closePaymentForm}
                            />
                        </Elements>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscription;