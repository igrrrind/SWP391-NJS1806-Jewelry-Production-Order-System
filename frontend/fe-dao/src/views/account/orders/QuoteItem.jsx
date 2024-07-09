import policies from "@/config/policies";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";


const QuoteItem = ({ quote, userDetails, orderItem }) => {
  return (
    <div className="max-w-3xl mx-auto p-8 border border-gray-300">
      <h1 className="text-2xl font-bold text-center mb-8">JEWELRY PRICING QUOTE</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-1">
          <span className="font-light">Quote Number:</span> {quote.quoteId}
        </div>
        <div className="col-span-1">
          <span className="font-light">Issue Date:</span> {formatDate(quote.createdDate)}
        </div>
        <div className="col-span-1">
          <span className="font-light">Email Address:</span> sale@pacifa.com
        </div>
        <div className="col-span-1">
          <span className="font-light">Contact Number:</span> 0938 562 745
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="col-span-1">
          <span className="font-light">Quote Prepared By:</span> PACIFA Sales Staff
        </div>
        <div className="col-span-1">
          <span className="font-light">Quote Prepared For:</span> {userDetails.firstName} {userDetails.lastName}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold">MATERIALS DESCRIPTION</h2>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">g/carat</th>
              <th className="text-left p-2">Price at time of creation</th>
            </tr>
          </thead>
          <tbody>           
                <tr className="border-b border-gray-200">
                  <td className="p-2">Metal</td>
                  <td className="p-2">{orderItem.metalTypeName}</td>
                  <td className="p-2">{quote.metalWeight}</td>
                  <td className="p-2">{formatPrice(quote.metalCost/quote.metalWeight)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2">Primary Stone</td>
                  <td className="p-2"> {orderItem.gemstoneColor} {orderItem.gemstoneType} </td>
                  <td className="p-2">{formatPrice(quote.caratCost/quote.caratPrice)}</td>
                  <td className="p-2">{formatPrice(quote.caratPrice)}</td>
                </tr>

          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold">PRICE DETAILS</h2>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Price (đ)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-2">Metal Cost</td>
              <td className="p-2"></td>
              <td className="p-2">{formatPrice(quote.metalCost)}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2">Carat Cost</td>
              <td className="p-2"></td>
              <td className="p-2 ">{formatPrice(quote.caratCost)}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2">Production Cost</td>
              <td className="p-2"></td>
              <td className="p-2">{formatPrice(quote.productionCost)}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-2 font-bold">Total</td>
              <td className="p-2 font-bold">{formatPrice(orderItem.quantity)}</td>
              <td className="p-2 font-bold">{formatPrice(quote.quoteTotalPrice)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold">TERMS AND CONDITIONS</h2>
        <ol className="list-decimal pl-4 mt-4">
          {policies.termsAndConditions.map((term) => (
            <li key={term.id}>{term.text}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default QuoteItem;
