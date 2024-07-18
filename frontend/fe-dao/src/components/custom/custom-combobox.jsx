import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { ArrowUpWideNarrowIcon, CheckIcon } from "lucide-react"

export function CustomCombobox({
  items, // Default to an empty array if items is not provided
  onSelect,
  placeholder = "Select an item...",
  buttonClassName,
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleSelect = (currentValue) => {
    setValue(currentValue === value ? "" : currentValue)
    onSelect(currentValue)
    setOpen(false)
  }

  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", buttonClassName)}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ArrowUpWideNarrowIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => handleSelect(item.value)}
              >
                {item.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
