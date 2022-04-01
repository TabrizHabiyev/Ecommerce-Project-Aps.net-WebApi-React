using E_Commerce_API.Domain.Entites;

namespace E_Commerce_API.API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query,string orderBy)
        {
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p=>p.name);
            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.name)
            };

            return query;
        }

        public static IQueryable<Product> Serach(this IQueryable<Product> query,string searchTerm)
        {

            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(p => p.name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query,string types,string category)
        {
            var typesList = new List<string>();
            var categoryList = new List<string>();

            if (!string.IsNullOrEmpty(types))
                typesList.AddRange(types.ToLower().Split(",").ToList());

            if (!string.IsNullOrEmpty(category))
                categoryList.AddRange(category.ToLower().Split(",").ToList());

            query = query.Where(p=>typesList.Count == 0 || typesList.Contains(p.Type));

            query = query.Where(p => categoryList.Count == 0 || categoryList.Contains(p.Category.Name));

            return query;
        }


    }
}
