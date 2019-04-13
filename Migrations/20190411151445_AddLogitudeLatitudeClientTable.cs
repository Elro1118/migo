using Microsoft.EntityFrameworkCore.Migrations;

namespace content.Migrations
{
    public partial class AddLogitudeLatitudeClientTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Locals",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Locals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Locals");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Locals");
        }
    }
}
