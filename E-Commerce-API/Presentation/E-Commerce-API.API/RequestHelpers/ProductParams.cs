namespace E_Commerce_API.API.RequestHelpers
{
    public class ProductParams : PginationParams
    {
        public string? OrderBy { get; set; }
        public string? SearchTerm { get; set; }
        public string? Types { get; set; }
        public string? Category { get; set; }
    }
}
