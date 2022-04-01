using E_Commerce_API.API.RequestHelpers;
using System.Text.Json;

namespace E_Commerce_API.API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginatonHeader(this HttpResponse response , MetaData metaData)
        {
            var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData,options));

            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
