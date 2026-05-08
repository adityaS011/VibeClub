import { Search } from "@/components/shared/Search";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { IOrderItem } from "@/lib/database/models/order.model";
import { formatDateTime, formatPrice } from "@/lib/utils";
import type { SearchParamProps } from "@/types";
import { Receipt, TrendingUp, Users, DollarSign } from "lucide-react";

const OrdersPage = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  const totalRevenue = orders
    ? orders.reduce(
        (sum: number, o: IOrderItem) => sum + parseFloat(o.totalAmount || "0"),
        0
      )
    : 0;

  const stats = [
    {
      icon: Receipt,
      label: "Total Orders",
      value: orders?.length ?? 0,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-100 dark:bg-violet-900/30",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: formatPrice(totalRevenue.toString()),
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      icon: Users,
      label: "Unique Buyers",
      value: orders
        ? new Set(orders.map((o: IOrderItem) => o.buyer)).size
        : 0,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: TrendingUp,
      label: "Avg. Order",
      value: orders?.length
        ? formatPrice((totalRevenue / orders.length).toString())
        : "$0.00",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <>
      <section className="bg-primary-50 dark:bg-[#000114] dark:text-slate-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold dark:text-white text-center sm:text-left">
            Order Management
          </h3>
        </div>
      </section>

      {/* Stats */}
      <section className="wrapper mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value, color, bg }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-grey-400/10 dark:border-slate-700 shadow-sm"
            >
              <div className={`${bg} ${color} p-2.5 rounded-xl`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="p-bold-16 dark:text-white">{value}</p>
                <p className="p-medium-12 text-grey-500 dark:text-grey-400">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="wrapper mt-5">
        <Search placeholder="Search buyer name..." />
      </section>

      {/* Table */}
      <section className="wrapper mt-5 mb-10 overflow-x-auto">
        <div className="rounded-2xl border border-grey-400/10 dark:border-slate-700 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-grey-50 dark:bg-slate-800 border-b border-grey-400/20 dark:border-slate-700">
                <th className="min-w-[200px] py-3 px-4 text-left p-semibold-14 text-grey-500 dark:text-grey-400">
                  Order ID
                </th>
                <th className="min-w-[200px] py-3 px-4 text-left p-semibold-14 text-grey-500 dark:text-grey-400">
                  Event
                </th>
                <th className="min-w-[150px] py-3 px-4 text-left p-semibold-14 text-grey-500 dark:text-grey-400">
                  Buyer
                </th>
                <th className="min-w-[130px] py-3 px-4 text-left p-semibold-14 text-grey-500 dark:text-grey-400">
                  Date
                </th>
                <th className="min-w-[100px] py-3 px-4 text-right p-semibold-14 text-grey-500 dark:text-grey-400">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {!orders || orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-16 text-center text-grey-500 dark:text-grey-400 p-regular-14"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((row: IOrderItem, idx: number) => (
                  <tr
                    key={row._id}
                    className={`p-regular-14 border-b border-grey-400/10 dark:border-slate-700 transition-colors hover:bg-grey-50 dark:hover:bg-slate-800/40 ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-transparent"
                        : "bg-grey-50/50 dark:bg-slate-800/20"
                    }`}
                  >
                    <td className="min-w-[200px] py-3.5 px-4 text-primary-500 font-mono text-xs truncate max-w-[200px]">
                      {row._id}
                    </td>
                    <td className="min-w-[200px] py-3.5 px-4 dark:text-white">
                      {row.eventTitle}
                    </td>
                    <td className="min-w-[150px] py-3.5 px-4 text-grey-600 dark:text-grey-400">
                      {row.buyer}
                    </td>
                    <td className="min-w-[130px] py-3.5 px-4 text-grey-500 dark:text-grey-400">
                      {formatDateTime(row.createdAt).dateOnly}
                    </td>
                    <td className="min-w-[100px] py-3.5 px-4 text-right font-semibold dark:text-white">
                      {formatPrice(row.totalAmount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default OrdersPage;
