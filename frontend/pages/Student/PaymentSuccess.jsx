import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const enroll = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error("No access token found.");
        return;
      }

      try {
        const res = await fetch(`https://devkingsbackend-production-3753.up.railway.app/api/student/tutorials/${courseId}/enroll`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Enrollment failed');
        }

        navigate(`/course/${courseId}`);
      } catch (err) {
        console.error("Enrollment after payment failed:", err.message);
      }
    };

    enroll();
  }, [courseId, navigate]);

  return (
    <div>
      <h1>✅ Payment Successful!</h1>
      <p>We're enrolling you in the course now...</p>
    </div>
  );
};

export default PaymentSuccess;
