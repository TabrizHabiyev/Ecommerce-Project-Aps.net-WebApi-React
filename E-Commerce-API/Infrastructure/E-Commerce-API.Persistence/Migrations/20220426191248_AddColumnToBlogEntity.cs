using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_Commerce_API.Persistence.Migrations
{
    public partial class AddColumnToBlogEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("3ec29023-a511-49c0-864b-a62fbdf98bbf"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("782cb135-728d-4657-9eca-e8d32b20f231"));

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "Blog",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("0627d1df-00ac-420c-bbe2-f31089a00078"), "a55d3606-e4f3-487d-9408-4ab6b1f8be48", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("36218ee9-046b-445c-93a1-e2204b687492"), "8808673a-94c4-4415-b1a5-3e8bde8c2bbc", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("0627d1df-00ac-420c-bbe2-f31089a00078"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("36218ee9-046b-445c-93a1-e2204b687492"));

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "Blog");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("3ec29023-a511-49c0-864b-a62fbdf98bbf"), "a4109029-bdc6-4488-a66e-c26aa5abc02e", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("782cb135-728d-4657-9eca-e8d32b20f231"), "e89654a9-ec8b-455b-9548-28e01820e43e", "Admin", "ADMIN" });
        }
    }
}
