"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const initialSuppliers = [
    { id: 1, name: 'Fresh Farms', contact: 'John Smith', email: 'john@freshfarms.com', phone: '123-456-7890' },
    { id: 2, name: 'Dairy Delights', contact: 'Jane Doe', email: 'jane@dairydelights.com', phone: '987-654-3210' },
]

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState(initialSuppliers)
    const [searchTerm, setSearchTerm] = useState('')
    const [editingSupplier, setEditingSupplier] = useState(null)
    const { toast } = useToast()

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddOrUpdateSupplier = (supplier) => {
        if (supplier.id) {
            setSuppliers(suppliers.map(s => s.id === supplier.id ? supplier : s))
            toast({
                title: "Success",
                description: "Supplier updated successfully.",
            })
        } else {
            const newSupplier = { ...supplier, id: Date.now() }
            setSuppliers([...suppliers, newSupplier])
            toast({
                title: "Success",
                description: "New supplier added successfully.",
            })
        }
        setEditingSupplier(null)
    }

    const handleEditSupplier = (supplier) => {
        setSuppliers(suppliers.map(s => s.id === supplier.id ? supplier : s))
        toast({
            title: "Success",
            description: "Supplier updated successfully.",
        })
    }

    const handleDeleteSupplier = (id) => {
        setSuppliers(suppliers.filter(supplier => supplier.id !== id))
        toast({
            title: "Success",
            description: "Supplier deleted successfully.",
            variant: "destructive",
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Suppliers Management</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add New Supplier
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <SupplierForm onSubmit={handleAddOrUpdateSupplier} />
                    </DialogContent>
                </Dialog>
            </div>
            <Input
                type="search"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact Person</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.name}</TableCell>
                            <TableCell>{supplier.contact}</TableCell>
                            <TableCell>{supplier.email}</TableCell>
                            <TableCell>{supplier.phone}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <SupplierForm onSubmit={(updatedSupplier) => handleEditSupplier({ ...supplier, ...updatedSupplier })} initialData={supplier} />
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="outline" size="icon" onClick={() => handleDeleteSupplier(supplier.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function SupplierForm({ onSubmit, initialData = null }) {
    const [formData, setFormData] = useState(
        initialData || {
            name: '',
            contact: '',
            email: '',
            phone: ''
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>{initialData ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
                <DialogDescription>
                    {initialData ? 'Edit the details of the supplier.' : 'Add a new supplier to the system.'}
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
                    <Label htmlFor="contact" className="text-right">
                        Contact Person
                    </Label>
                    <Input
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Phone
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">{initialData ? 'Update' : 'Add'} Supplier</Button>
            </DialogFooter>
        </form>
    )
}