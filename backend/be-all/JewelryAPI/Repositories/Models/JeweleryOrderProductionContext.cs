using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Models;

public partial class JeweleryOrderProductionContext : DbContext
{
    public JeweleryOrderProductionContext()
    {
    }

    public JeweleryOrderProductionContext(DbContextOptions<JeweleryOrderProductionContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CustomerDetail> CustomerDetails { get; set; }

    public virtual DbSet<Design> Designs { get; set; }

    public virtual DbSet<DesignImage> DesignImages { get; set; }

    public virtual DbSet<Gemstone> Gemstones { get; set; }

    public virtual DbSet<Metal> Metals { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderCustomItem> OrderCustomItems { get; set; }

    public virtual DbSet<OrderFixedItem> OrderFixedItems { get; set; }

    public virtual DbSet<PaymentStatus> PaymentStatuses { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductImage> ProductImages { get; set; }

    public virtual DbSet<ProductStock> ProductStocks { get; set; }

    public virtual DbSet<ProductType> ProductTypes { get; set; }

    public virtual DbSet<ProductionStatus> ProductionStatuses { get; set; }

    public virtual DbSet<ProductionTracking> ProductionTrackings { get; set; }

    public virtual DbSet<Quote> Quotes { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Shipment> Shipments { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local);uid=sa;pwd=myPassw0rd;database=JeweleryOrderProduction;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomerDetail>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__CD65CB854745170C");

            entity.ToTable("Customer_Detail");

            entity.HasIndex(e => e.Uid, "UQ__Customer__DD701265865277BB").IsUnique();

            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.AddressLine)
                .HasMaxLength(50)
                .HasColumnName("address_line");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.DistrictTown)
                .HasMaxLength(50)
                .HasColumnName("district_town");
            entity.Property(e => e.Province)
                .HasMaxLength(50)
                .HasColumnName("province");
            entity.Property(e => e.Sex)
                .HasMaxLength(10)
                .HasColumnName("sex");
            entity.Property(e => e.Uid)
                .HasMaxLength(50)
                .HasColumnName("uid");

            entity.HasOne(d => d.UidNavigation).WithOne(p => p.CustomerDetail)
                .HasForeignKey<CustomerDetail>(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Customer_De__uid__2F10007B");
        });

        modelBuilder.Entity<Design>(entity =>
        {
            entity.HasKey(e => e.DesignId).HasName("PK__Design__1BA5C3FB51C0E0D5");

            entity.ToTable("Design");

            entity.Property(e => e.DesignId).HasColumnName("design_id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.DesignatedCompletion).HasColumnName("designated_completion");
            entity.Property(e => e.IsCompleted).HasColumnName("is_completed");
            entity.Property(e => e.OrderCustomId).HasColumnName("order_custom_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");

            entity.HasOne(d => d.OrderCustom).WithMany(p => p.Designs)
                .HasForeignKey(d => d.OrderCustomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Design__order_cu__5CD6CB2B");

            entity.HasOne(d => d.Order).WithMany(p => p.Designs)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Design__order_id__5DCAEF64");
        });

        modelBuilder.Entity<DesignImage>(entity =>
        {
            entity.HasKey(e => e.DesignImageId).HasName("PK__Design_I__02A18B692D1DB5AB");

            entity.ToTable("Design_Images");

            entity.Property(e => e.DesignImageId).HasColumnName("design_image_id");
            entity.Property(e => e.DesignId).HasColumnName("design_id");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");

            entity.HasOne(d => d.Design).WithMany(p => p.DesignImages)
                .HasForeignKey(d => d.DesignId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Design_Im__desig__60A75C0F");
        });

        modelBuilder.Entity<Gemstone>(entity =>
        {
            entity.HasKey(e => e.GemstoneId).HasName("PK__Gemstone__08CCD219BEB8A5C9");

            entity.ToTable("Gemstone");

            entity.HasIndex(e => new { e.GemstoneType, e.GemstoneCarat, e.Color }, "UQ__Gemstone__3E728275E8314ECA").IsUnique();

            entity.Property(e => e.GemstoneId).HasColumnName("gemstone_id");
            entity.Property(e => e.Color)
                .HasMaxLength(50)
                .HasColumnName("color");
            entity.Property(e => e.GemstoneCarat).HasColumnName("gemstone_carat");
            entity.Property(e => e.GemstoneType)
                .HasMaxLength(50)
                .HasColumnName("gemstone_type");
        });

        modelBuilder.Entity<Metal>(entity =>
        {
            entity.HasKey(e => e.MetalId).HasName("PK__Metals__15EB863CEB6C76C9");

            entity.HasIndex(e => e.MetalTypeName, "UQ__Metals__EC08308C669E084E").IsUnique();

            entity.Property(e => e.MetalId).HasColumnName("metal_id");
            entity.Property(e => e.MetalTypeName)
                .HasMaxLength(50)
                .HasColumnName("metal_type_name");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__4659622948062F10");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.IsCustom).HasColumnName("is_custom");
            entity.Property(e => e.IsShipment).HasColumnName("is_shipment");
            entity.Property(e => e.OrderDate).HasColumnName("order_date");
            entity.Property(e => e.OrderTotal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("order_total");
            entity.Property(e => e.PaymentStatusId).HasColumnName("payment_status_id");
            entity.Property(e => e.StatusId).HasColumnName("status_id");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__customer__46E78A0C");

            entity.HasOne(d => d.PaymentStatus).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__payment___47DBAE45");

            entity.HasOne(d => d.Status).WithMany(p => p.Orders)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__status_i__48CFD27E");
        });

        modelBuilder.Entity<OrderCustomItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemId).HasName("PK__Order_Cu__3764B6BC3D5B099C");

            entity.ToTable("Order_Custom_Items");

            entity.HasIndex(e => new { e.OrderId, e.GemstoneId, e.MetalId, e.Size }, "UQ__Order_Cu__1502BCB89BD56021").IsUnique();

            entity.Property(e => e.OrderItemId).HasColumnName("order_item_id");
            entity.Property(e => e.GemstoneId).HasColumnName("gemstone_id");
            entity.Property(e => e.MetalId).HasColumnName("metal_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Size).HasColumnName("size");
            entity.Property(e => e.Subtotal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("subtotal");
            entity.Property(e => e.UnitPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("unit_price");

            entity.HasOne(d => d.Gemstone).WithMany(p => p.OrderCustomItems)
                .HasForeignKey(d => d.GemstoneId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order_Cus__gemst__534D60F1");

            entity.HasOne(d => d.Metal).WithMany(p => p.OrderCustomItems)
                .HasForeignKey(d => d.MetalId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order_Cus__metal__5441852A");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderCustomItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order_Cus__order__52593CB8");
        });

        modelBuilder.Entity<OrderFixedItem>(entity =>
        {
            entity.HasKey(e => e.OrderFixedItemId).HasName("PK__Order_Fi__A0C3DD86EB603420");

            entity.ToTable("Order_Fixed_Items");

            entity.HasIndex(e => new { e.OrderId, e.ProductStockId }, "UQ__Order_Fi__14E50BC24FE57FAB").IsUnique();

            entity.Property(e => e.OrderFixedItemId).HasColumnName("order_fixed_item_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.ProductStockId).HasColumnName("product_stock_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Subtotal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("subtotal");
            entity.Property(e => e.UnitPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("unit_price");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderFixedItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order_Fix__order__4CA06362");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderFixedItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order_Fix__produ__4E88ABD4");

            entity.HasOne(d => d.ProductStock).WithMany(p => p.OrderFixedItems)
                .HasForeignKey(d => d.ProductStockId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order_Fix__produ__4D94879B");
        });

        modelBuilder.Entity<PaymentStatus>(entity =>
        {
            entity.HasKey(e => e.PaymentStatusId).HasName("PK__Payment___E6BF5015BB10D9CB");

            entity.ToTable("Payment_Status");

            entity.Property(e => e.PaymentStatusId).HasColumnName("payment_status_id");
            entity.Property(e => e.StatusName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status_name");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Product__47027DF5428001A5");

            entity.ToTable("Product");

            entity.HasIndex(e => e.ProductName, "UQ__Product__2B5A6A5FBA024A94").IsUnique();

            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.ProductDescription)
                .HasColumnType("text")
                .HasColumnName("product_description");
            entity.Property(e => e.ProductName)
                .HasMaxLength(50)
                .HasColumnName("product_name");
            entity.Property(e => e.ProductTypeId).HasColumnName("product_type_id");

            entity.HasOne(d => d.ProductType).WithMany(p => p.Products)
                .HasForeignKey(d => d.ProductTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Product__product__38996AB5");
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.ProductImageId).HasName("PK__Product___0302EB4AFF004D3F");

            entity.ToTable("Product_Images");

            entity.Property(e => e.ProductImageId).HasColumnName("product_image_id");
            entity.Property(e => e.Alt)
                .HasColumnType("text")
                .HasColumnName("alt");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.ProductStockId).HasColumnName("product_stock_id");

            entity.HasOne(d => d.ProductStock).WithMany(p => p.ProductImages)
                .HasForeignKey(d => d.ProductStockId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Product_I__produ__6754599E");
        });

        modelBuilder.Entity<ProductStock>(entity =>
        {
            entity.HasKey(e => e.ProductStockId).HasName("PK__Product___2BC69EA4B795777B");

            entity.ToTable("Product_Stock");

            entity.HasIndex(e => new { e.ProductId, e.GemstoneId, e.MetalId, e.Size }, "UQ__Product___1459A3641392FC4D").IsUnique();

            entity.Property(e => e.ProductStockId).HasColumnName("product_stock_id");
            entity.Property(e => e.GalleryUrl)
                .HasMaxLength(255)
                .HasColumnName("gallery_url");
            entity.Property(e => e.GemstoneId).HasColumnName("gemstone_id");
            entity.Property(e => e.MetalId).HasColumnName("metal_id");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Size).HasColumnName("size");
            entity.Property(e => e.StockQuantity).HasColumnName("stock_quantity");

            entity.HasOne(d => d.Gemstone).WithMany(p => p.ProductStocks)
                .HasForeignKey(d => d.GemstoneId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Product_S__gemst__403A8C7D");

            entity.HasOne(d => d.Metal).WithMany(p => p.ProductStocks)
                .HasForeignKey(d => d.MetalId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Product_S__metal__412EB0B6");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductStocks)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Product_S__produ__3F466844");
        });

        modelBuilder.Entity<ProductType>(entity =>
        {
            entity.HasKey(e => e.ProductTypeId).HasName("PK__Product___6EED3ED6E97E8D7F");

            entity.ToTable("Product_Types");

            entity.HasIndex(e => e.TypeName, "UQ__Product___543C4FD9EE663F3E").IsUnique();

            entity.Property(e => e.ProductTypeId).HasColumnName("product_type_id");
            entity.Property(e => e.TypeName)
                .HasMaxLength(50)
                .HasColumnName("type_name");
        });

        modelBuilder.Entity<ProductionStatus>(entity =>
        {
            entity.HasKey(e => e.ProductionStatusId).HasName("PK__Producti__182287F3E4695FEF");

            entity.ToTable("Production_Status");

            entity.Property(e => e.ProductionStatusId).HasColumnName("production_status_id");
            entity.Property(e => e.StatusName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("status_name");
        });

        modelBuilder.Entity<ProductionTracking>(entity =>
        {
            entity.HasKey(e => e.ProductionId).HasName("PK__Producti__60F4D65CE7238258");

            entity.ToTable("Production_Tracking");

            entity.Property(e => e.ProductionId).HasColumnName("production_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductionStatusId).HasColumnName("production_status_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");

            entity.HasOne(d => d.Order).WithMany(p => p.ProductionTrackings)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Productio__order__72C60C4A");

            entity.HasOne(d => d.ProductionStatus).WithMany(p => p.ProductionTrackings)
                .HasForeignKey(d => d.ProductionStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Productio__produ__73BA3083");
        });

        modelBuilder.Entity<Quote>(entity =>
        {
            entity.HasKey(e => e.QuoteId).HasName("PK__Quote__0D37DF0CD82C9F9F");

            entity.ToTable("Quote");

            entity.Property(e => e.QuoteId).HasColumnName("quote_id");
            entity.Property(e => e.CaratCost)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("carat_cost");
            entity.Property(e => e.CaratPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("carat_price");
            entity.Property(e => e.CreatedDate).HasColumnName("created_date");
            entity.Property(e => e.MetalCost)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("metal_cost");
            entity.Property(e => e.MetalWeight)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("metal_weight");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductionCost)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("production_cost");
            entity.Property(e => e.QuoteTotalPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("quote_total_price");

            entity.HasOne(d => d.Order).WithMany(p => p.Quotes)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Quote__order_id__59FA5E80");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__Request__18D3B90F692F9375");

            entity.ToTable("Request");

            entity.Property(e => e.RequestId).HasColumnName("request_id");
            entity.Property(e => e.OrderCustomId).HasColumnName("order_custom_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.RequestDescription).HasColumnName("request_description");

            entity.HasOne(d => d.OrderCustom).WithMany(p => p.Requests)
                .HasForeignKey(d => d.OrderCustomId)
                .HasConstraintName("FK__Request__order_c__6383C8BA");

            entity.HasOne(d => d.Order).WithMany(p => p.Requests)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Request__order_i__6477ECF3");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("PK__Review__60883D90B0424DC9");

            entity.ToTable("Review");

            entity.Property(e => e.ReviewId).HasColumnName("review_id");
            entity.Property(e => e.Comment)
                .HasColumnType("text")
                .HasColumnName("comment");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Rating).HasColumnName("rating");

            entity.HasOne(d => d.Product).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Review__product___6E01572D");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__760965CCE56D2188");

            entity.HasIndex(e => e.RoleName, "UQ__Roles__783254B12D7EDC04").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<Shipment>(entity =>
        {
            entity.HasKey(e => e.ShipmentId).HasName("PK__Shipment__41466E59AA31B08C");

            entity.ToTable("Shipment");

            entity.Property(e => e.ShipmentId).HasColumnName("shipment_id");
            entity.Property(e => e.IsShipping).HasColumnName("is_shipping");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ShipmentDate).HasColumnName("shipment_date");
            entity.Property(e => e.ShippingAddress)
                .HasMaxLength(255)
                .HasColumnName("shipping_address");
            entity.Property(e => e.ShippingDistrict)
                .HasMaxLength(50)
                .HasColumnName("shipping_district");
            entity.Property(e => e.ShippingFee)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("shipping_fee");
            entity.Property(e => e.ShippingProvince)
                .HasMaxLength(50)
                .HasColumnName("shipping_province");

            entity.HasOne(d => d.Order).WithMany(p => p.Shipments)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Shipment__order___6A30C649");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.StatusId).HasName("PK__Status__3683B531F25116D0");

            entity.ToTable("Status");

            entity.HasIndex(e => e.StatusDetail, "UQ__Status__1433E42039144A0A").IsUnique();

            entity.Property(e => e.StatusId).HasColumnName("status_id");
            entity.Property(e => e.StatusDetail)
                .HasMaxLength(50)
                .HasColumnName("status_detail");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__Transact__85C600AFBA4D0358");

            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");
            entity.Property(e => e.IsDeposit).HasColumnName("is_deposit");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.PaymentType)
                .HasMaxLength(50)
                .HasColumnName("payment_type");
            entity.Property(e => e.TransactionDate).HasColumnName("transaction_date");
            entity.Property(e => e.TransactionTotal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("transaction_total");

            entity.HasOne(d => d.Order).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__order__571DF1D5");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PK__User__DD701264969EA385");

            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "UQ__User__AB6E61644E95C06C").IsUnique();

            entity.HasIndex(e => e.Phone, "UQ__User__B43B145F80744A73").IsUnique();

            entity.Property(e => e.Uid)
                .HasMaxLength(50)
                .HasColumnName("uid");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(35)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(35)
                .HasColumnName("last_name");
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId).HasColumnName("role_id");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User__role_id__29572725");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
