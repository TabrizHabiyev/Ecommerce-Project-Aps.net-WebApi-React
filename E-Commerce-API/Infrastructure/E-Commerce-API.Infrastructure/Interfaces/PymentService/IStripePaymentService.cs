

using E_Commerce_API.Domain.Entites;
using Stripe;

namespace E_Commerce_API.Infrastructure.Interfaces.PymentService
{
    public interface IstripePaymentService
    {
        Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket);
    }
}
