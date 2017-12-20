using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vega.Migrations
{
    public partial class ContactRefactoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContactPhone",
                table: "Vehicles",
                newName: "Contact_ContactPhone");

            migrationBuilder.RenameColumn(
                name: "ContactName",
                table: "Vehicles",
                newName: "Contact_ContactName");

            migrationBuilder.RenameColumn(
                name: "ContactEmail",
                table: "Vehicles",
                newName: "Contact_ContactEmail");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Contact_ContactPhone",
                table: "Vehicles",
                newName: "ContactPhone");

            migrationBuilder.RenameColumn(
                name: "Contact_ContactName",
                table: "Vehicles",
                newName: "ContactName");

            migrationBuilder.RenameColumn(
                name: "Contact_ContactEmail",
                table: "Vehicles",
                newName: "ContactEmail");
        }
    }
}
