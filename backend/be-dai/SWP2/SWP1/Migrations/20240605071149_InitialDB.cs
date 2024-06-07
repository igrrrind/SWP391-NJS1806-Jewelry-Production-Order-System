using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SWP1.Migrations
{
    /// <inheritdoc />
    public partial class InitialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gemstone",
                columns: table => new
                {
                    gemstone_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    gemstone_type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    gemstone_carat = table.Column<int>(type: "int", nullable: false),
                    color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Gemstone__08CCD219CEDA5283", x => x.gemstone_id);
                });

            migrationBuilder.CreateTable(
                name: "Metals",
                columns: table => new
                {
                    metal_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    metal_type_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Metals__15EB863C76CB438F", x => x.metal_id);
                });

            migrationBuilder.CreateTable(
                name: "Payment_Status",
                columns: table => new
                {
                    payment_status_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    status_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Payment___E6BF50154C071B9C", x => x.payment_status_id);
                });

            migrationBuilder.CreateTable(
                name: "Product_Types",
                columns: table => new
                {
                    product_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    type_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product___6EED3ED653FC3220", x => x.product_type_id);
                });

            migrationBuilder.CreateTable(
                name: "Production_Status",
                columns: table => new
                {
                    production_status_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    status_name = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Producti__182287F3F5396385", x => x.production_status_id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    role_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Roles__760965CC58BC597E", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    status_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    status_detail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Status__3683B5316AA6C15D", x => x.status_id);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_type_id = table.Column<int>(type: "int", nullable: false),
                    product_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    product_description = table.Column<string>(type: "text", nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product__47027DF5E69C6D01", x => x.product_id);
                    table.ForeignKey(
                        name: "FK__Product__product__38996AB5",
                        column: x => x.product_type_id,
                        principalTable: "Product_Types",
                        principalColumn: "product_type_id");
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    uid = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    first_name = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    role_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__User__DD701264BE3EF2FB", x => x.uid);
                    table.ForeignKey(
                        name: "FK__User__role_id__29572725",
                        column: x => x.role_id,
                        principalTable: "Roles",
                        principalColumn: "role_id");
                });

            migrationBuilder.CreateTable(
                name: "Product_Stock",
                columns: table => new
                {
                    product_stock_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    gemstone_id = table.Column<int>(type: "int", nullable: false),
                    metal_id = table.Column<int>(type: "int", nullable: false),
                    size = table.Column<int>(type: "int", nullable: true),
                    stock_quantity = table.Column<int>(type: "int", nullable: true),
                    price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    gallery_url = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product___2BC69EA4502325B6", x => x.product_stock_id);
                    table.ForeignKey(
                        name: "FK__Product_S__gemst__403A8C7D",
                        column: x => x.gemstone_id,
                        principalTable: "Gemstone",
                        principalColumn: "gemstone_id");
                    table.ForeignKey(
                        name: "FK__Product_S__metal__412EB0B6",
                        column: x => x.metal_id,
                        principalTable: "Metals",
                        principalColumn: "metal_id");
                    table.ForeignKey(
                        name: "FK__Product_S__produ__3F466844",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id");
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    review_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    rating = table.Column<int>(type: "int", nullable: false),
                    comment = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Review__60883D9064A2E871", x => x.review_id);
                    table.ForeignKey(
                        name: "FK__Review__product___6C190EBB",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id");
                });

            migrationBuilder.CreateTable(
                name: "Customer_Detail",
                columns: table => new
                {
                    customer_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    uid = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    sex = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    birth_date = table.Column<DateOnly>(type: "date", nullable: false),
                    address_line = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    province = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    district_town = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__CD65CB857D6C9221", x => x.customer_id);
                    table.ForeignKey(
                        name: "FK__Customer_De__uid__2F10007B",
                        column: x => x.uid,
                        principalTable: "User",
                        principalColumn: "uid");
                });

            migrationBuilder.CreateTable(
                name: "Product_Images",
                columns: table => new
                {
                    product_image_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_stock_id = table.Column<int>(type: "int", nullable: false),
                    image_url = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    alt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product___0302EB4AE59968AB", x => x.product_image_id);
                    table.ForeignKey(
                        name: "FK__Product_I__produ__656C112C",
                        column: x => x.product_stock_id,
                        principalTable: "Product_Stock",
                        principalColumn: "product_stock_id");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customer_id = table.Column<int>(type: "int", nullable: false),
                    order_date = table.Column<DateOnly>(type: "date", nullable: false),
                    order_status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    payment_status_id = table.Column<int>(type: "int", nullable: false),
                    is_shipment = table.Column<bool>(type: "bit", nullable: false),
                    is_custom = table.Column<bool>(type: "bit", nullable: false),
                    order_total = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Orders__46596229E8BBB67D", x => x.order_id);
                    table.ForeignKey(
                        name: "FK__Orders__customer__46E78A0C",
                        column: x => x.customer_id,
                        principalTable: "Customer_Detail",
                        principalColumn: "customer_id");
                    table.ForeignKey(
                        name: "FK__Orders__payment___47DBAE45",
                        column: x => x.payment_status_id,
                        principalTable: "Payment_Status",
                        principalColumn: "payment_status_id");
                });

            migrationBuilder.CreateTable(
                name: "Order_Custom_Items",
                columns: table => new
                {
                    order_item_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    gemstone_id = table.Column<int>(type: "int", nullable: false),
                    metal_id = table.Column<int>(type: "int", nullable: false),
                    size = table.Column<int>(type: "int", nullable: true),
                    unit_price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: true),
                    subtotal = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Order_Cu__3764B6BC30FF0772", x => x.order_item_id);
                    table.ForeignKey(
                        name: "FK__Order_Cus__gemst__52593CB8",
                        column: x => x.gemstone_id,
                        principalTable: "Gemstone",
                        principalColumn: "gemstone_id");
                    table.ForeignKey(
                        name: "FK__Order_Cus__metal__534D60F1",
                        column: x => x.metal_id,
                        principalTable: "Metals",
                        principalColumn: "metal_id");
                    table.ForeignKey(
                        name: "FK__Order_Cus__order__5165187F",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id");
                });

            migrationBuilder.CreateTable(
                name: "Order_Fixed_Items",
                columns: table => new
                {
                    order_fixed_item_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    product_stock_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    unit_price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    subtotal = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Order_Fi__A0C3DD8628D97D9E", x => x.order_fixed_item_id);
                    table.ForeignKey(
                        name: "FK__Order_Fix__order__4BAC3F29",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id");
                    table.ForeignKey(
                        name: "FK__Order_Fix__produ__4CA06362",
                        column: x => x.product_stock_id,
                        principalTable: "Product_Stock",
                        principalColumn: "product_stock_id");
                    table.ForeignKey(
                        name: "FK__Order_Fix__produ__4D94879B",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id");
                });

            migrationBuilder.CreateTable(
                name: "Production_Tracking",
                columns: table => new
                {
                    production_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    start_date = table.Column<DateOnly>(type: "date", nullable: false),
                    production_status_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Producti__60F4D65CC9B6FBC3", x => x.production_id);
                    table.ForeignKey(
                        name: "FK__Productio__order__70DDC3D8",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id");
                    table.ForeignKey(
                        name: "FK__Productio__produ__71D1E811",
                        column: x => x.production_status_id,
                        principalTable: "Production_Status",
                        principalColumn: "production_status_id");
                });

            migrationBuilder.CreateTable(
                name: "Quote",
                columns: table => new
                {
                    quote_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    created_date = table.Column<DateOnly>(type: "date", nullable: false),
                    metal_weight = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    metal_cost = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    carat_price = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    carat_cost = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    production_cost = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    quote_total_price = table.Column<decimal>(type: "decimal(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Quote__0D37DF0CAC11FD63", x => x.quote_id);
                    table.ForeignKey(
                        name: "FK__Quote__order_id__59063A47",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id");
                });

            migrationBuilder.CreateTable(
                name: "Shipment",
                columns: table => new
                {
                    shipment_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    shipment_date = table.Column<DateOnly>(type: "date", nullable: false),
                    shipping_address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    shipping_province = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    shipping_district = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    is_shipping = table.Column<bool>(type: "bit", nullable: false),
                    shipping_fee = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Shipment__41466E590340BA74", x => x.shipment_id);
                    table.ForeignKey(
                        name: "FK__Shipment__order___68487DD7",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id");
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    transaction_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    transaction_date = table.Column<DateOnly>(type: "date", nullable: false),
                    transaction_total = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    payment_type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    is_deposit = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Transact__85C600AFCE28A483", x => x.transaction_id);
                    table.ForeignKey(
                        name: "FK__Transacti__order__5629CD9C",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id");
                });

            migrationBuilder.CreateTable(
                name: "Design",
                columns: table => new
                {
                    design_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_custom_id = table.Column<int>(type: "int", nullable: false),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    designated_completion = table.Column<DateOnly>(type: "date", nullable: true),
                    is_completed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Design__1BA5C3FB1D7E47D5", x => x.design_id);
                    table.ForeignKey(
                        name: "FK__Design__order_cu__5BE2A6F2",
                        column: x => x.order_custom_id,
                        principalTable: "Order_Custom_Items",
                        principalColumn: "order_item_id");
                    table.ForeignKey(
                        name: "FK__Design__order_id__5CD6CB2B",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id");
                });

            migrationBuilder.CreateTable(
                name: "Request_Images",
                columns: table => new
                {
                    request_image_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_custom_id = table.Column<int>(type: "int", nullable: false),
                    image_url = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Request___4212A850089C6B9B", x => x.request_image_id);
                    table.ForeignKey(
                        name: "FK__Request_I__order__628FA481",
                        column: x => x.order_custom_id,
                        principalTable: "Order_Custom_Items",
                        principalColumn: "order_item_id");
                });

            migrationBuilder.CreateTable(
                name: "Design_Images",
                columns: table => new
                {
                    design_image_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    design_id = table.Column<int>(type: "int", nullable: false),
                    image_url = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Design_I__02A18B69AE54657F", x => x.design_image_id);
                    table.ForeignKey(
                        name: "FK__Design_Im__desig__5FB337D6",
                        column: x => x.design_id,
                        principalTable: "Design",
                        principalColumn: "design_id");
                });

            migrationBuilder.CreateIndex(
                name: "UQ__Customer__DD70126518233B30",
                table: "Customer_Detail",
                column: "uid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Design_order_custom_id",
                table: "Design",
                column: "order_custom_id");

            migrationBuilder.CreateIndex(
                name: "IX_Design_order_id",
                table: "Design",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Design_Images_design_id",
                table: "Design_Images",
                column: "design_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Gemstone__3E728275FAABF542",
                table: "Gemstone",
                columns: new[] { "gemstone_type", "gemstone_carat", "color" },
                unique: true,
                filter: "[color] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ__Metals__EC08308C09FFA6E5",
                table: "Metals",
                column: "metal_type_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_Custom_Items_gemstone_id",
                table: "Order_Custom_Items",
                column: "gemstone_id");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Custom_Items_metal_id",
                table: "Order_Custom_Items",
                column: "metal_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Order_Cu__1502BCB8FEC97BA0",
                table: "Order_Custom_Items",
                columns: new[] { "order_id", "gemstone_id", "metal_id", "size" },
                unique: true,
                filter: "[size] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Fixed_Items_product_id",
                table: "Order_Fixed_Items",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Fixed_Items_product_stock_id",
                table: "Order_Fixed_Items",
                column: "product_stock_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Order_Fi__14E50BC22CDFA13C",
                table: "Order_Fixed_Items",
                columns: new[] { "order_id", "product_stock_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_customer_id",
                table: "Orders",
                column: "customer_id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_payment_status_id",
                table: "Orders",
                column: "payment_status_id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_product_type_id",
                table: "Product",
                column: "product_type_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Product__2B5A6A5F7B3D399A",
                table: "Product",
                column: "product_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_Images_product_stock_id",
                table: "Product_Images",
                column: "product_stock_id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Stock_gemstone_id",
                table: "Product_Stock",
                column: "gemstone_id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Stock_metal_id",
                table: "Product_Stock",
                column: "metal_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Product___1459A36433C02DA4",
                table: "Product_Stock",
                columns: new[] { "product_id", "gemstone_id", "metal_id", "size" },
                unique: true,
                filter: "[size] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ__Product___543C4FD9E23A69D1",
                table: "Product_Types",
                column: "type_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Production_Tracking_order_id",
                table: "Production_Tracking",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Production_Tracking_production_status_id",
                table: "Production_Tracking",
                column: "production_status_id");

            migrationBuilder.CreateIndex(
                name: "IX_Quote_order_id",
                table: "Quote",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Request_Images_order_custom_id",
                table: "Request_Images",
                column: "order_custom_id");

            migrationBuilder.CreateIndex(
                name: "IX_Review_product_id",
                table: "Review",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Roles__783254B14781B073",
                table: "Roles",
                column: "role_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shipment_order_id",
                table: "Shipment",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Status__1433E420E686241F",
                table: "Status",
                column: "status_detail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_order_id",
                table: "Transactions",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_User_role_id",
                table: "User",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "UQ__User__AB6E616488495356",
                table: "User",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__User__B43B145F570D159C",
                table: "User",
                column: "phone",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Design_Images");

            migrationBuilder.DropTable(
                name: "Order_Fixed_Items");

            migrationBuilder.DropTable(
                name: "Product_Images");

            migrationBuilder.DropTable(
                name: "Production_Tracking");

            migrationBuilder.DropTable(
                name: "Quote");

            migrationBuilder.DropTable(
                name: "Request_Images");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropTable(
                name: "Shipment");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Design");

            migrationBuilder.DropTable(
                name: "Product_Stock");

            migrationBuilder.DropTable(
                name: "Production_Status");

            migrationBuilder.DropTable(
                name: "Order_Custom_Items");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Gemstone");

            migrationBuilder.DropTable(
                name: "Metals");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Product_Types");

            migrationBuilder.DropTable(
                name: "Customer_Detail");

            migrationBuilder.DropTable(
                name: "Payment_Status");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
