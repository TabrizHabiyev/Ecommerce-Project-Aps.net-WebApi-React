

using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Infrastructure.Interfaces.PymentService;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace E_Commerce_API.Infrastructure.PaymetServices
{
    public class StripePaymentService: IstripePaymentService
    {
        private readonly IConfiguration _config;

        public StripePaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();
            var subtotal = basket.Items.Sum(items => items.Quantity * items.Product.Price);

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var option = new PaymentIntentCreateOptions
                {
                    Amount = (long?)subtotal,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(option);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long?)subtotal
                };
               await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            return intent;
        }
    }
}
