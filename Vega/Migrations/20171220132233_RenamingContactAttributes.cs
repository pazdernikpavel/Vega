using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vega.Migrations
{
    public partial class RenamingContactAttributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Contact_ContactPhone",
                table: "Vehicles",
                newName: "Contact_Phone");

            migrationBuilder.RenameColumn(
                name: "Contact_ContactName",
                table: "Vehicles",
                newName: "Contact_Name");

            migrationBuilder.RenameColumn(
                name: "Contact_ContactEmail",
                table: "Vehicles",
                newName: "Contact_Email");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Contact_Phone",
                table: "Vehicles",
                newName: "Contact_ContactPhone");

            migrationBuilder.RenameColumn(
                name: "Contact_Name",
                table: "Vehicles",
                newName: "Contact_ContactName");

            migrationBuilder.RenameColumn(
                name: "Contact_Email",
                table: "Vehicles",
                newName: "Contact_ContactEmail");
        }
    }
}
