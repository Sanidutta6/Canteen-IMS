"use client"

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Plus, Edit } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialInventory = [
    { id: 1, name: 'Apples', quantity: 50, unit: 'kg', threshold: 10 },
    { id: 2, name: 'Milk', quantity: 30, unit: 'liters', threshold: 5 },
    { id: 3, name: 'Bread', quantity: 100, unit: 'loaves', threshold: 20 },
    { id: 4, name: 'Cheese', quantity: 20, unit: 'kg', threshold: 5 },
]

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("quantity")}</div>
        ),
    },
    {
        accessorKey: "unit",
        header: "Unit",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("unit")}</div>
        ),
    },
    {
        accessorKey: "threshold",
        header: "Threshold",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("threshold")}</div>
        ),
    },
    {
        id: "status",
        cell: ({ row }) => {
            const quantity = row.getValue("quantity")
            const threshold = row.getValue("threshold")
            return (
                <div className={quantity <= threshold ? "text-red-500" : "text-green-500"}>
                    {quantity <= threshold ? "Low Stock" : "In Stock"}
                </div>
            )
        },
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original
            return (
                <div className="flex space-x-2">
                    <Link to={`/inventory/${item.id}`}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <InventoryForm onSubmit={(updatedItem) => handleEditItem({ ...item, ...updatedItem })} initialData={item} />
                        </DialogContent>
                    </Dialog>
                </div>
            )
        },
    },
]

export default function InventoryPage() {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState(initialInventory)
    const { toast } = useToast()

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleAddItem = (newItem) => {
        const itemWithId = { ...newItem, id: Date.now() }
        setData([...data, itemWithId])
        toast({
            title: "Success",
            description: "New item added successfully.",
        })
    }

    const handleEditItem = (item) => {
        setData(data.map(d => d.id === item.id ? item : d))
        toast({
            title: "Success",
            description: "Item updated successfully.",
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Inventory Management</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <InventoryForm onSubmit={handleAddItem} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

function InventoryForm({ onSubmit, initialData = null }) {
    const [formData, setFormData] = useState(
        initialData || {
            name: '',
            quantity: 0,
            unit: '',
            threshold: 0
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'name' || name === 'unit' ? value : Number(value) }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>{initialData ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <DialogDescription>
                    {initialData ? 'Edit the details of the inventory item.' : 'Add a new item to the inventory.'}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                        Quantity
                    </Label>
                    <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="unit" className="text-right">
                        Unit
                    </Label>
                    <Input
                        id="unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="threshold" className="text-right">
                        Threshold
                    </Label>
                    <Input
                        id="threshold"
                        name="threshold"
                        type="number"
                        value={formData.threshold}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">{initialData ? 'Update' : 'Add'} Item</Button>
            </DialogFooter>
        </form>
    )
}