import { Disk as createDisk, useDisk as createDiskHook } from "@otag/disk"
import { config } from "@utils"

const { city, weather, user, notes } = config.namespaces || {}

export const Disk = createDisk()
export const cityDisk = createDisk({ namespace: city })
export const weatherDisk = createDisk({ namespace: weather })

export const useDisk = createDiskHook(Disk)
export const useWeatherDisk = createDiskHook(weatherDisk)
export const useUserDisk = createDiskHook(createDisk({ namespace: user }))
export const useNoteDisk = createDiskHook(createDisk({ namespace: notes }))
