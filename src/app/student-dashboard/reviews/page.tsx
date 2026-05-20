import Image from "next/image";
import Link from "next/link";
import { MOCK_REVIEWS } from "@/data/mock";

export default function StudentReviewsPage() {
  const reviews = MOCK_REVIEWS;

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`material-symbols-outlined text-sm ${i <= rating ? 'text-amber-400' : 'text-slate-200'}`}
          style={{ fontVariationSettings: i <= rating ? "'FILL' 1" : "'FILL' 0" }}>
          star
        </span>
      ))}
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Reviews</h2>
          <p className="text-slate-500">Reviews you&apos;ve left for properties you&apos;ve stayed at.</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-blue-600">star</span>
          </div>
          <h3 className="text-lg font-bold mb-2">No reviews yet</h3>
          <p className="text-slate-500 max-w-sm">After staying at a property, you can leave a review to help other students.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                  {review.propertyImage && (
                    <Image src={review.propertyImage} alt={review.propertyTitle} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/property/${review.propertyId}`} className="font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                        {review.propertyTitle}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-1">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
